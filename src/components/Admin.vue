<script setup>
import { ref, onMounted } from "vue";
import Toast from "./Toast.vue";
import Pagination from "./Pagination.vue";

const products = ref([]);
const newProduct = ref({
  name: "",
  dose: "",
  price: "",
  type: "",
  companyName: "",
  amount: "",
});
const editProduct = ref(null);
const token = localStorage.getItem("sessionToken");

const toastRef = ref(null);

const page = ref(0);
const totalPages = ref(1);
const limit = 18;

const fetchProducts = async () => {
  const response = await fetch("http://localhost:3030/api/v1/listDrugs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ page: page.value, limit }),
  });
  const result = await response.json();
  products.value = result.data || [];
  if (result.metadata && result.metadata.pageCount !== undefined) {
    totalPages.value = result.metadata.pageCount;
  }
};

const addProduct = async () => {
  const payload = {
    ...newProduct.value,
    price: Number(newProduct.value.price),
    dose: Number(newProduct.value.dose),
    amount: Number(newProduct.value.amount),
  };
  const response = await fetch("http://localhost:3030/api/v1/addDrug", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (result.status === "success") {
    fetchProducts();
    newProduct.value = {
      name: "",
      dose: "",
      price: "",
      type: "",
      companyName: "",
      amount: "",
    };
    toastRef.value.showToast("Dodano produkt!", "success");
  } else {
    toastRef.value.showToast(result.data || "Błąd dodawania produktu", "error");
  }
};

const startEdit = (product) => {
  editProduct.value = { ...product };
};

const updateProduct = async () => {
  const payload = {
    drugId: editProduct.value.idDrug,
    name: editProduct.value.name,
    dose: Number(editProduct.value.dose),
    price: Number(editProduct.value.price),
    type: editProduct.value.type,
    companyName: editProduct.value.companyName,
    amount: Number(editProduct.value.amount),
  };
  const response = await fetch("http://localhost:3030/api/v1/updateDrug", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (result.status === "success") {
    fetchProducts();
    editProduct.value = null;
    toastRef.value.showToast("Zaktualizowano produkt!", "success");
  } else {
    toastRef.value.showToast(
      result.data || "Błąd aktualizacji produktu",
      "error"
    );
  }
};

const removeProduct = async (idDrug) => {
  const response = await fetch("http://localhost:3030/api/v1/removeDrug", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ drugId: idDrug }),
  });
  const result = await response.json();
  if (result.status === "success") {
    fetchProducts();
    toastRef.value.showToast("Usunięto produkt!", "success");
  } else {
    toastRef.value.showToast(result.data || "Błąd usuwania produktu", "error");
  }
};

const nextPage = () => {
  if (page.value < totalPages.value - 1) {
    page.value++;
    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onMounted(fetchProducts);
</script>

<template>
  <main>
    <Toast ref="toastRef" />
    <h2>Produkty</h2>
    <h3>Dodaj nowy produkt</h3>
    <form @submit.prevent="addProduct" class="add-form">
      <input v-model="newProduct.name" placeholder="Nazwa" required />
      <input v-model="newProduct.dose" placeholder="Dawka" required />
      <input
        v-model="newProduct.price"
        placeholder="Cena"
        required
        type="number"
      />
      <input v-model="newProduct.type" placeholder="Typ" required />
      <input v-model="newProduct.companyName" placeholder="Firma" required />
      <input
        v-model="newProduct.amount"
        placeholder="Ilość"
        required
        type="number"
      />
      <button type="submit">Dodaj</button>
    </form>
    <div class="products-list">
      <div
        v-for="product in products"
        :key="product.idDrug"
        class="product-block"
      >
        <template v-if="editProduct && editProduct.idDrug === product.idDrug">
          <div class="edit-section">
            <input v-model="editProduct.name" placeholder="Nazwa" />
            <input v-model="editProduct.dose" placeholder="Dawka" />
            <input
              v-model="editProduct.price"
              placeholder="Cena"
              type="number"
              step="0.01"
            />
            <input v-model="editProduct.type" placeholder="Typ" />
            <input v-model="editProduct.companyName" placeholder="Firma" />
            <input
              v-model="editProduct.amount"
              placeholder="Ilość"
              type="number"
            />
            <div class="actions">
              <button @click="updateProduct">Zapisz</button>
              <button @click="editProduct = null" type="button">Anuluj</button>
            </div>
          </div>
        </template>
        <template v-else>
          <div><b>Nazwa:</b> {{ product.name }}</div>
          <div><b>Dawka:</b> {{ product.dose }}mg</div>
          <div><b>Cena:</b> {{ product.price.toFixed(2) }} zł</div>
          <div><b>Typ:</b> {{ product.type }}</div>
          <div><b>Firma:</b> {{ product.companyName }}</div>
          <div><b>Ilość:</b> {{ product.amount }}</div>
          <div class="actions">
            <button @click="startEdit(product)">Edytuj</button>
            <button @click="removeProduct(product.idDrug)">Usuń</button>
          </div>
        </template>
      </div>
    </div>
    <Pagination
      :currentPage="page"
      :totalPages="totalPages"
      @next="nextPage"
      @prev="prevPage"
    />
  </main>
</template>
<style scoped lang="scss">
$green: #81b433;
$light-gray: #f4f8ec;
$border: #c7e2a3;
main {
  margin: 32px 0;
  padding-left: 48px;
  padding-right: 48px;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
  }

  .products-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 32px;
  }
  .product-block {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    padding: 18px 20px;
    min-width: 220px;
    max-width: 260px;
    flex: 1 1 220px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .edit-section {
    background: $light-gray;
    border-radius: 10px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 1px 6px rgba($green, 0.07);
    input {
      padding: 6px 10px;
      border: 1px solid $border;
      border-radius: 6px;
      font-size: 1rem;
      background: #fff;
      transition: border 0.2s;
      &:focus {
        border: 1.5px solid $green;
        outline: none;
      }
    }
  }
  .actions {
    margin-top: 10px;
    display: flex;
    gap: 8px;
  }
  .add-form {
    background: $light-gray;
    border-radius: 10px;
    box-shadow: 0 1px 6px rgba($green, 0.07);
    padding: 18px 14px 14px 14px;
    margin-bottom: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-end;

    input {
      padding: 6px 10px;
      border: 1px solid $border;
      border-radius: 6px;
      font-size: 1rem;
      background: #fff;
      transition: border 0.2s;
      &:focus {
        border: 1.5px solid $green;
        outline: none;
      }
    }

    button {
      padding: 7px 16px;
      border-radius: 6px;
      border: none;
      background: $green;
      color: #fff;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: background 0.2s;
      &:hover {
        background: darken($green, 10%);
      }
    }
  }
  button {
    padding: 4px 10px;
    border-radius: 6px;
    border: none;
    background: $green;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    &:hover {
      background: darken($green, 10%);
    }
  }
}
</style>
