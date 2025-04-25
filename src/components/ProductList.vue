<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "../scripts/cart";
import Toast from "./Toast.vue"; 

const toastRef = ref(null);
const data = ref([]);
const cart = useCartStore();

const fetchData = async () => {
  const token = localStorage.getItem("sessionToken");
  const requestBody = {
    page: 0,
    limit: 100,
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
  .filter(item => item.amount > 0)
  .map(item => ({
    ...item,
    id: item.idDrug,
  }));
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchData();
});
const addProduct = (item) => {
  cart.addToCart(item);
  toastRef.value.showToast("Dodano do koszyka");
};
</script>

<template>
  <main>
    <div class="container">
      <ul>
        <li v-for="item in data" :key="item.id">
          <img :src="item.image" alt="zdjęcie" />
          <div class="values">
            <div class="info">
              <p>{{ item.name }}</p>
              <p class="cena">{{ item.price.toFixed(2) }}zł</p>
            </div>
            <form @submit.prevent="addProduct(item)">
              <button type="submit">+</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  </main>
  <Toast ref="toastRef" />
</template>

<style scoped lang="scss">
// $green: #57FF90;
$green: #81b433;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$black: #000;
$gray: #666;


main {
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 100vh;

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
    min-height: 95vh;
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      max-width: 1200px;
      width: 100%;
    }

    li {
      flex-grow: 1;
      width: 280px;
      background-color: white;
      border-radius: 12px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: $shadow;

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
          text-align: center;

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
