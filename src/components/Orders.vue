<script setup>
import { ref, onMounted, computed } from "vue";
const orders = ref([]);
const page = ref(0);
const total = ref(0);

const fetchOrders = async () => {
  const token = localStorage.getItem("sessionToken");
  try {
    const response = await fetch("http://localhost:3030/api/v1/orderHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        page: page.value,
        limit: 50,
      }),
    });
    const result = await response.json();
    orders.value = result.data || [];
    total.value = result.total || 0;
  } catch (error) {
    console.log(error);
  }
};

const groupedOrders = computed(() => {
  // Grupowanie po orderId
  const groups = {};
  for (const order of orders.value) {
    if (!groups[order.orderId]) groups[order.orderId] = [];
    groups[order.orderId].push(order);
  }
  // Zamień na tablicę [{orderId, items: [...]}, ...]
  return Object.entries(groups).map(([orderId, items]) => ({
    orderId,
    items
  })).reverse()

});

onMounted(() => {
  fetchOrders();

});
</script>

<template>
  <div>
    <h2>Historia zamówień</h2>
    <div v-for="group in groupedOrders" :key="group.orderId" class="order-block">
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
</template>

<style scoped lang="scss">
.order-block {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  margin-bottom: 32px;
  padding: 24px 28px;
}

.order-header {
  border-bottom: 2px solid #81b433;
  margin-bottom: 18px;
  padding-bottom: 8px;
}
.order-total {
  margin: 12px 0 18px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.order-title {
  font-size: 1.2rem;
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
  padding: 16px 20px;
  min-width: 220px;
  margin-bottom: 10px;
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (max-width: 900px) {
  .products-list {
    flex-direction: column;
    gap: 12px;
  }
  .order-block {
    padding: 16px 8px;
  }
}
</style>