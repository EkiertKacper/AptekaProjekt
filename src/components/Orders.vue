<script setup>
import { ref, onMounted } from "vue";
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
        limit: 50
      }),
    });
    const result = await response.json();
    orders.value = result.data || [];
    total.value = result.total || 0;
  } catch (error) {
    console.log(error);
  }
};



onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <div>
    <h2>Historia zamówień</h2>
    <table>
      <thead>
        <tr>
          <th>ID zamówienia</th>
          <th>Ilość</th>
          <th>Nazwa leku</th>
          <th>Dawka</th>
          <th>Cena</th>
          <th>Cena końcowa</th>
          <th>Typ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
            <td data-label="ID zamówienia">{{ order.id }}</td>
<td data-label="Ilość">{{ order.purchase_amount }}</td>
<td data-label="Nazwa leku">{{ order.drug_name }}</td>
<td data-label="Dawka">{{ order.dose }}</td>
<td data-label="Cena">{{ order.price.toFixed(2) }}</td>
<td data-label="Cena końcowa">{{ (order.price*order.purchase_amount).toFixed(2)}}</td>
<td data-label="Typ">{{ order.type }}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 24px;
  font-size: 1rem;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
}

th, td {
  padding: 14px 12px;
  text-align: left;
}

th {
  background: #81b433;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #6e9e2e;
}

tr {
  transition: background 0.2s;
}

tbody tr:nth-child(even) {
  background: #f8f8f8;
}

tbody tr:hover {
  background: #e6f4d7;
}

td {
  border-bottom: 1px solid #e0e0e0;
}

tbody tr:last-child td {
  border-bottom: none;
}
@media (max-width: 1200px) and (min-width: 801px) {
  table {
    font-size: 0.95rem;
  }
  th, td {
    padding: 10px 6px;
  }
  .pagination {
    font-size: 0.95rem;
  }
}

@media (max-width: 800px) {
  table, thead, tbody, th, td, tr {
    display: block;
    width: 100%;
  }
  thead tr {
    display: none;
  }
  tbody tr {
    margin-bottom: 18px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    padding: 10px 0;
  }
  td {
    border: none;
    position: relative;
    padding-left: 50%;
    min-height: 36px;
    text-align: left;
    background: none;
  }
  td:before {
    position: absolute;
    left: 12px;
    top: 12px;
    width: 45%;
    white-space: nowrap;
    font-weight: bold;
    color: #81b433;
    content: attr(data-label);
  }
}
</style>