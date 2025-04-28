<script setup>
import { ref, onMounted, defineComponent } from "vue";
import { useCartStore } from "../scripts/cart";
import { usePageChanger } from "../state/pageChanger";
import ProductPage from "./ProductPage.vue";
import Toast from "./Toast.vue";

const cart = useCartStore();
const data = ref([]);
const suggested = ref([]);
const toastRef = ref(null);

const checkout = async () => {
  if (cart.items.length === 0) {
    toastRef.value.showToast(
      "Koszyk jest pusty. Dodaj produkty przed złożeniem zamówienia.",
      "error"
    );
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
        items: cart.items.map((item) => ({
          id: item.idDrug,
          amount: item.quantity,
        })),
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

const fetchData = async () => {
  const token = localStorage.getItem("sessionToken");
  try {
    const response = await fetch("http://localhost:3030/api/v1/listDrugs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ page: 0, limit: 10 }),
    });
    const fullData = await response.json();
    data.value = fullData.data;
    const notInCart = data.value.filter(
      (product) => !cart.items.some((item) => item.idDrug === product.idDrug)
    );
    suggested.value = notInCart.sort(() => 0.5 - Math.random()).slice(0, 8);
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchData);

const validateQuantity = (item) => {
  let q = item.quantity;
  if (q < 1) q = 1;
  if (q > item.amount) q = item.amount;
  cart.updateQuantity(item.idDrug, q);
};

const removeItem = (idDrug) => {
  cart.removeFromCart(idDrug);
  toastRef.value.showToast("Produkt został usunięty z koszyka", "success");
};

const pageChanger = usePageChanger();
const openProductPage = (itemId) => {
  const selectedItem = data.value.find((item) => item.idDrug === itemId);
  pageChanger.changePage(defineComponent(ProductPage), {
    product: selectedItem,
  });
};
</script>

<template>
  <div>
    <div class="cart-header">Koszyk</div>
    <div
      class="cart-item"
      v-for="item in cart.items"
      :key="item.idDrug"
      @click="openProductPage(item.idDrug)"
    >
      <div class="product-info">
        <img src="../assets/paracetamol.jpg" alt="Product" />
        <div class="product-name">
          <p>{{ item.name }}</p>
        </div>
        <p>{{ item.dose }}mg</p>
      </div>
      <div class="product-actions">
        <span>{{ item.price.toFixed(2) }} zł</span>
        <input
          @click.stop
          type="number"
          v-model.number="item.quantity"
          min="1"
          :max="item.amount"
          @input="validateQuantity(item)"
        />
        <button @click.stop="removeItem(item.idDrug)">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
    <div class="cart-footer">
      <div class="total">
        Do zapłaty:
        {{
          cart.items
            .reduce((sum, i) => sum + i.price * i.quantity, 0)
            .toFixed(2)
        }}zł
      </div>
      <button class="checkout-button" @click="checkout">
        Zamów produkty >
      </button>
    </div>
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
    align-items: start;
    gap: 10px;

    img {
      width: 100px;
      height: 100px;
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

@media screen and (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;

    .product-actions {
      margin-top: 10px;
    }
  }
}
</style>
