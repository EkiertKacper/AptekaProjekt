<script setup>
import { ref, onMounted, defineComponent } from "vue";
import { useCartStore } from "../scripts/cart";
import { usePageChanger } from "../state/pageChanger";
import ProductPage from "./ProductPage.vue";
import Toast from "./Toast.vue";
import Pagination from "./Pagination.vue";
const data = ref([]);
const cart = useCartStore();
const pageChanger = usePageChanger();

const page = ref(0);
const totalPages = ref(1);
const limit = 16;

const fetchData = async () => {
  const token = localStorage.getItem("sessionToken");
  const requestBody = {
    page: page.value,
    limit: limit,
  };

  try {
    const response = await fetch("http://localhost:3030/api/v1/listDrugs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(requestBody),
    });

    const fullData = await response.json();
    data.value = (fullData.data || [])
      .filter((item) => item.amount > 0)
      .map((item) => ({
        ...item,
        id: item.idDrug,
      }));

    if (fullData.metadata && fullData.metadata.pageCount !== undefined) {
      totalPages.value = fullData.metadata.pageCount;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchData();
});

const toast = ref(null);
function showToast(message, status) {
  toast.value.showToast(message, status);
}
const addProduct = (item) => {
  const mes = cart.addToCart(item);
  switch (mes) {
    case "positive":
      showToast("Dodano do koszyka!", "positive");
      break;
    case "error":
      showToast("Nie mamy więcej tego produktu!", "negative");
      break;
  }
};

const openProductPage = (itemId) => {
  const selectedItem = data.value.find((item) => item.id === itemId);
  pageChanger.changePage(defineComponent(ProductPage), {
    product: selectedItem,
  });
};

const nextPage = () => {
  if (page.value < totalPages.value - 1) {
    page.value++;
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<template>
  <main>
    <div class="container">
      <ul>
        <li
          v-for="item in data"
          :key="item.id"
          :class="item.id"
          @click="openProductPage(item.id)"
        >
          <img src="../assets/paracetamol.jpg" alt="zdjęcie" />
          <div class="values">
            <div class="info">
              <p>{{ item.name }} {{item.dose}}mg </p>
              <p class="cena">{{ item.price.toFixed(2) }}zł</p>
            </div>
            <form @submit.prevent="addProduct(item)">
              <button type="submit" @click.stop>+</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
    <Pagination
      :currentPage="page"
      :totalPages="totalPages"
      @next="nextPage"
      @prev="prevPage"
      style="margin-bottom: 1rem;"
    />
    <Toast ref="toast" />
  </main>
</template>

<style scoped lang="scss">
$green: #81b433;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$black: #000;
$gray: #666;

main {
  display: flex;
  flex-direction: column;
  background-color: white;

  header {
    background-color: white;
    padding: 12px;
    box-shadow: $shadow;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: $black;
    }
    button {
      width: 5%;
      height: 100%;
      min-width: 40px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      span {
        font-size: 32px;
      }
    }
  }

  .container {
    display: flex;
    justify-content: center;
    padding: 12px;
    ul {
      list-style: none;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      max-width: 1200px;
      width: 100%;
      height: fit-content;
    }

    li {
      flex-grow: 1;
      width: 280px;
      max-height: 250px;
      max-width: 280px;
      background-color: white;
      border-radius: 12px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: $shadow;
      cursor: pointer;

      img {
        width: 170px;
        height: 170px;
        border-radius: 8px;
        margin-bottom: 8px;
        box-shadow: $shadow;
      }

      .values {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 8px;

        .info {
          display: flex;
          flex-direction: column;
          text-align: start;

          p:first-of-type {
            font-size: 16px;
            color: $black;
          }

          .cena {
            font-size: 14px;
            font-weight: bold;
            color: $black;
          }
        }

        form {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          label {
            font-size: 16px;
            color: $black;
            display: flex;
            align-items: center;
          }
          select {
            height: 40px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: white;
            color: #333;
            font-size: 16px;
          }

          button {
            background-color: $green;
            color: #fff;
            border: none;
            border-radius: 100%;
            width: 28px;
            height: 28px;
            font-size: 20px;
            line-height: 0;
            padding: 0;
            box-shadow: $shadow;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &:hover {
              background-color: darken($green, 10%);
            }

            &:active {
              background-color: lighten($green, 10%);
            }
          }
        }
      }
    }
  }
}

</style>
