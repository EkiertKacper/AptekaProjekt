<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "../scripts/cart";
import Toast from "./Toast.vue"; 

const cart = useCartStore();

const data = ref("");
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const suggested = ref([]);
const toastRef = ref(null); 

const checkout = async () => {
  if (cart.items.length === 0) {
    toastRef.value.showToast("Koszyk jest pusty. Dodaj produkty przed złożeniem zamówienia.", "error");
    return;
  }
  const token = localStorage.getItem("sessionToken");
  try {
    const response = await fetch("http://localhost:3030/api/v1/orderDrug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        items: cart.items.map(item => ({
          id: item.idDrug,
          amount: item.quantity
        }))
      }),
    });
    const result = await response.json();
    if (result.status !== "success") {
      toastRef.value.showToast(`Błąd zamawiania: ${result.data}`, "error");
      return;
    }
    cart.items = [];
    toastRef.value.showToast("Złożono zamówienie", "success");
  } catch (error) {
    toastRef.value.showToast("Błąd połączenia przy zamawianiu", "error");
  }
};
console.log(cart.items);
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

    const notInCart = data.value.filter(
      (product) => !cart.items.some((item) => item.idDrug === product.idDrug)
    );

    const shuffled = [...notInCart].sort(() => 0.5 - Math.random());
    suggested.value = shuffled.slice(0, 8);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchData();
});
const validateQuantity = (item) => {
  if (item.quantity < 1) {
    cart.updateQuantity(item.idDrug, 1);
  } else if (item.quantity > item.amount) {
    cart.updateQuantity(item.idDrug, item.amount);
  } else {
    cart.updateQuantity(item.idDrug, item.quantity);
  }
};

const removeItem = (idDrug) => {
  cart.removeFromCart(idDrug);
};
</script>

<template>
  <div>
    <div class="cart-header">Koszyk</div>
    <div class="cart-item" v-for="item in cart.items" :key="item.idDrug">
      <div class="product-info">
        <img :src="item.image" alt="Product" />
        <div class="product-name">{{ item.name }}</div>
      </div>
      <div class="product-actions">
        <span>{{ item.price.toFixed(2) }} zł</span>
        <input
          type="number"
          v-model.number="item.quantity"
          min="1"
          :max="item.amount"
          @input="validateQuantity(item)"
        />
        <button @click="removeItem(item.idDrug)">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
    <div class="cart-footer">
      <div class="total">
        Do zapłaty:
        {{ cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2) }}zł
      </div>
      <button class="checkout-button" @click="checkout">Zamów produkty ></button>
    </div>

    <!-- <div
      class="horizontal-scroll"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    >
      <h3>Może jeszcze to Ci się przyda</h3>
      <div class="suggested-items">
        <div
          class="suggested-item"
          v-for="item in suggested"
          :key="item.idDrug"
        >
          <img :src="item.image" :alt="item.name">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-price">{{ item.price.toFixed(2) }} zł</p>
          <button class="add-button" @click="cart.addToCart(item)">+</button>
        </div>
      </div>
    </div> -->
    <Toast ref="toastRef" />
  </div>
</template>

<style scoped lang="scss">
$green: #81b433;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$black: #000;
$gray: #666;

.cart-header {
  font-size: 2rem;
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
      width: 50px;
      height: 25px;
      text-align: center;
      border: 1px solid $gray;
      border-radius: 4px;
      font-size: 14px;
      color: $black;
      background-color: $light-gray;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;

      &:focus {
        border-color: $green;
        box-shadow: 0 0 5px rgba(129, 180, 51, 0.5);
      }

      &:hover {
        border-color: darken($gray, 10%);
      }
    }
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    .material-symbols-outlined {
      font-size: 24px;
      color: $gray;
      transition: color 0.3s;

      &:hover {
        color: $green;
      }
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
  max-width: 1000px;
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
    gap: 20px;
    

    .suggested-item {
      flex: 0 0 auto;
      width: 180px;
      text-align: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: $shadow;
      padding: 15px;

      img {
        width: 100%;
        height: 120px;
        border-radius: 8px;
        margin-bottom: 10px;
      }

      .item-name {
        font-size: 14px;
        font-weight: bold;
        color: $black;
        margin-bottom: 5px;
      }

      .item-price {
        font-size: 12px;
        color: $gray;
        margin-bottom: 10px;
      }

      .add-button {
        background-color: $green;
        color: white;
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          background-color: darken($green, 10%);
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;

    .product-actions {
      margin-top: 10px;
    }
  }

  .horizontal-scroll {
    padding: 10px;

    h3 {
      font-size: 16px;
    }

    .suggested-items {
      gap: 40px;

      .suggested-item {
        width: 140px;
        padding: 10px;
        

        .image-placeholder {
          height: 120px;
        }

        .item-name {
          font-size: 1.1rem;
        }

        .item-price {
          font-size: 1.2rem;
        }

        .add-button {
          width: 40px;
          height: 40px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
