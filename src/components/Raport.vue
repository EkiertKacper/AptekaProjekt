<script setup>
import { ref, onMounted, computed } from "vue";
import Pagination from "./Pagination.vue";

const reports = ref([]);
const page = ref(0);
const totalPages = ref(1);
const limit = 4;

const fetchReports = async () => {
  try {
    const token = localStorage.getItem("sessionToken");
    const response = await fetch("http://localhost:3030/api/v1/orderReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ page: page.value, limit }),
    });
    const result = await response.json();
    reports.value = result.data || [];
    if (result.metadata && result.metadata.pageCount !== undefined) {
      totalPages.value = result.metadata.pageCount;
    }
  } catch (error) {
    console.log(error);
  }
};


const groupedOrders = computed(() => {
  const groups = {};
  for (const report of reports.value) {
    const orderId = report.orderId;
    if (!groups[orderId]) groups[orderId] = { items: [], user: report };
    groups[orderId].items.push(report);
  }

  return Object.entries(groups)
    .map(([orderId, group]) => ({
      orderId,
      items: group.items,
      user: group.user
    }))
    .sort((a, b) => b.orderId - a.orderId);
});

const nextPage = () => {
  if (page.value < totalPages.value - 1) {
    page.value++;
    fetchReports();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    fetchReports();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(fetchReports);
</script>

<template>
  <div class="main-container">
    <h2>Raport zamówień</h2>
    <div
      v-for="group in groupedOrders"
      :key="group.orderId"
      class="order-block"
    >
      <div class="order-header">
        <span class="order-title">Zamówienie #{{ group.orderId }}</span>
      </div>
      <div class="order-user">
        <b>Zamawiający:</b>
        {{ group.user.user_name }} {{ group.user.user_surname }} ({{ group.user.user_email }})
      </div>
      <div class="order-total">
        <b>Łączna cena zamówienia:</b>
        {{
          group.items
            .reduce(
              (sum, order) => sum + order.price * order.purchase_amount,
              0
            )
            .toFixed(2)
        }}
        zł
      </div>
      <div class="products-list">
        <div
          v-for="order in group.items"
          :key="order.id"
          class="product-card"
        >
          <div><b>Nazwa leku:</b> {{ order.drug_name }}</div>
          <div><b>Dawka:</b> {{ order.dose }}mg</div>
          <div><b>Ilość:</b> {{ order.purchase_amount }}</div>
          <div><b>Cena za sztukę:</b> {{ order.price.toFixed(2) }} zł</div>
          <div><b>Typ:</b> {{ order.type }}</div>
        </div>
      </div>
    </div>
    <Pagination
      :currentPage="page"
      :totalPages="totalPages"
      @next="nextPage"
      @prev="prevPage"
    />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  margin: 32px 0;
  padding-left: 48px;
  padding-right: 48px;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
  }
  .user-block {
    background: #f4f4f4;
    border-radius: 14px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.05);
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
  .order-user {
  margin: 8px 0 8px 0;
  font-size: 1.05rem;
  color: #444;
}
  .order-block {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
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
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
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
