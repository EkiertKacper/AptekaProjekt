<script setup>
import { ref, onMounted, computed } from "vue";
const reports = ref([]);
const page = ref(0);

const fetchReports = async () => {
  try {
    const token = localStorage.getItem("sessionToken");
    const response = await fetch("http://localhost:3030/api/v1/orderReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ page: page.value, limit: 50 }),
    });
    const result = await response.json();
    reports.value = result.data || [];
  } catch (error) {
    console.log(error);
  }
};


const groupedReports = computed(() => {
  const users = {};
  for (const report of reports.value) {
    const email = report.user_email;
    if (!users[email]) users[email] = { user: report, orders: {} };
    const orderId = report.orderId;
    if (!users[email].orders[orderId]) users[email].orders[orderId] = [];
    users[email].orders[orderId].push(report);
  }

  return Object.values(users).map(userGroup => ({
    user_name: userGroup.user.user_name,
    user_surname: userGroup.user.user_surname,
    user_email: userGroup.user.user_email,
    orders: Object.entries(userGroup.orders)
      .map(([orderId, items]) => ({
        orderId,
        items
      })).reverse()
      
  }));
});

onMounted(fetchReports);
</script>

<template>
  <div class="main-container">
    <h2>Raport zamówień</h2>
    <div v-for="user in groupedReports" :key="user.user_email" class="user-block">
      <div class="user-header">
        <span class="user-title">{{ user.user_name }} {{ user.user_surname }} ({{ user.user_email }})</span>
      </div>
      <div v-for="group in user.orders" :key="group.orderId" class="order-block">
        <div class="order-header">
          <span class="order-title">Zamówienie #{{ group.orderId }}</span>
        </div>
        <div class="order-total">
          <b>Łączna cena zamówienia:</b>
          {{
            group.items.reduce(
              (sum, order) => sum + order.price * order.purchase_amount,
              0
            ).toFixed(2)
          }} zł
        </div>
        <div class="products-list">
          <div v-for="order in group.items" :key="order.id" class="product-card">
            <div><b>Nazwa leku:</b> {{ order.drug_name }}</div>
            <div><b>Dawka:</b> {{ order.dose }}mg</div>
            <div><b>Ilość:</b> {{ order.purchase_amount }}</div>
            <div><b>Cena za sztukę:</b> {{ order.price.toFixed(2) }} zł</div>
            <div><b>Typ:</b> {{ order.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  margin: 32px 0;
  padding-left: 48px;
  padding-right: 48px;

  h2{
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
  }
.user-block {
  background: #f4f4f4;
  border-radius: 14px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.05);
  margin-bottom: 40px;
  padding: 18px 18px 8px 18px;
}
.user-header {
  border-bottom: 2px solid #81b433;
  margin-bottom: 18px;
  padding-bottom: 8px;
}
.user-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2a2a2a;
}
.order-block {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  margin-bottom: 24px;
  padding: 18px 22px;
}
.order-header {
  border-bottom: 2px solid #81b433;
  margin-bottom: 12px;
  padding-bottom: 6px;
}
.order-total {
  margin: 10px 0 14px 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
}
.order-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #81b433;
}
.products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
.product-card {
  background: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  padding: 14px 16px;
  min-width: 200px;
  margin-bottom: 10px;
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
}
@media (max-width: 900px) {
  .products-list {
    flex-direction: column;
    gap: 12px;
  }
  .order-block {
    padding: 12px 4px;
  }
  .user-block {
    padding: 10px 4px 4px 4px;
  }
}
</style>