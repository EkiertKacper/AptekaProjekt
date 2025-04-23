<script setup>
import { ref, onMounted } from "vue";
import DropdownList from "./DropdownList.vue";
import Cart from "./Cart.vue";
import BurgerMenu from "./MenuItems.vue";

const data = ref("");

const fetchData = async () => {
  const token = localStorage.getItem("sessionToken");
  const requestBody = {
    page: 0,
    limit: 10,
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
    data.value = fullData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchData();
});
const addProduct = () => {};
</script>

<template>
  <main>
    <div class="container">
      <DropdownList />
      <div class="right-section">
        <Cart />
      </div>
    </div>
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
  min-height: 100vh;

  .container {
    display: flex;
    padding: 12px;
    justify-content: space-between;
    min-height: 95vh;

    .right-section {
      flex-grow: 1;
      background-color: white;
      padding: 20px;
      box-shadow: $shadow;
      border-radius: 8px;

      .cart-header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .cart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        background-color: $light-gray;
        border-radius: 8px;
        margin-bottom: 10px;

        .product-info {
          display: flex;
          align-items: center;
          gap: 10px;

          img {
            width: 50px;
            height: 50px;
            border-radius: 8px;
          }

          .product-name {
            font-weight: bold;
            color: $black;
          }
        }

        .product-actions {
          display: flex;
          align-items: center;
          gap: 10px;

          input {
            width: 40px;
            text-align: center;
            border: 1px solid $gray;
            border-radius: 4px;
          }

          button {
            background-color: transparent;
            border: none;
            cursor: pointer;
          }
        }
      }

      .cart-footer {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .total {
          font-weight: bold;
          color: $black;
        }

        .checkout-button {
          background-color: $green;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;

          &:hover {
            background-color: darken($green, 10%);
          }
        }
      }
      .horizontal-scroll {
        margin: 0 auto;
        margin-top: 20px;
        background-color: $light-gray;
        padding: 20px;
        border-radius: 8px;
        overflow-x: auto;
        max-width: 1200px;
        box-sizing: border-box;
        cursor: grab;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
        &:active {
          cursor: grabbing;
        }

        h3 {
          margin-bottom: 20px;
          font-size: 18px;
          color: $black;
        }

        .suggested-items {
          display: flex;
          gap: 30px;

          .suggested-item {
            flex: 0 0 auto;
            width: 200px;
            text-align: center;
            background-color: white;
            border-radius: 8px;
            box-shadow: $shadow;
            padding: 20px;

            .image-placeholder {
              width: 100%;
              height: 150px;
              background-color: $gray;
              border-radius: 8px;
              margin-bottom: 10px;
            }

            .item-name {
              font-size: 16px;
              font-weight: bold;
              color: $black;
              margin-bottom: 5px;
            }

            .item-price {
              font-size: 14px;
              color: $gray;
              margin-bottom: 10px;
            }

            .add-button {
              background-color: $green;
              color: white;
              border: none;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              font-size: 20px;
              cursor: pointer;

              &:hover {
                background-color: darken($green, 10%);
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1250px) {
  .container {
    margin-right: 10%;
  }
}
@media screen and (max-width: 1250px) {
  .container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-left: none;

    .right-section {
      width: 100%;
      max-width: 600px;
      background-color: white;
      padding: 20px;
      box-shadow: $shadow;
      border-radius: 8px;
      .horizontal-scroll {
        padding: 10px;
        h3 {
          font-size: 16px;
        }

        .suggested-items {
          gap: 10px;

          .suggested-item {
            width: 120px;
            padding: 10px;
            .image-placeholder {
              height: 100px;
            }

            .item-name {
              font-size: 14px;
            }

            .item-price {
              font-size: 12px;
            }

            .add-button {
              width: 30px;
              height: 30px;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
