<script setup>
import { defineComponent, ref } from 'vue';
import { usePageChanger } from '../state/pageChanger';
import ProductList from './ProductList.vue';

    const pageChanger = usePageChanger()

    const currentProduct = pageChanger.currentProps.product

    const goBack = () => {
        pageChanger.changePage(defineComponent(ProductList))
    };
</script>
<template>
    <main>
        <div class="product-page">
          <div class="product-details">
            <img :src="currentProduct.image" :alt="currentProduct.name" class="product-image">
            <div class="product-info">
              <h1>{{ currentProduct.name }}</h1>
              <p class="company">Producent: {{ currentProduct.companyName }}</p>
              <p class="price">Cena: {{ currentProduct.price.toFixed(2) }} zł</p>
              <p class="type">Typ: {{ currentProduct.type }}</p>
              <p class="dose" v-if="currentProduct.dose">Dawka: {{ currentProduct.dose }}</p>
              <p class="amount">Dostępna ilość: {{ currentProduct.amount }}</p>
            </div>
          </div>
          <button @click="goBack" class="back-button">Powrót na stronę główną</button>
        </div>
    </main>    
</template>

<style scoped lang="scss">
.product-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-details {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 200px;
  max-height: 200px; /* Dodana maksymalna wysokość */
  height: auto;
  border-radius: 4px;
  object-fit: contain; /* Dodane, aby obrazek zmieścił się w kontenerze */
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-info h1 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
}

.product-info p {
  margin-bottom: 5px;
}

.company {
  font-style: italic;
  color: #777;
}

.price {
  font-weight: bold;
  color: #000;
  font-size: 18px;
}

.back-button {
  padding: 10px 20px;
  background-color: #81b433;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: darken(#81b433, 10%);
}
</style>