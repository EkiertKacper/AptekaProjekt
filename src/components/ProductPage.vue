<script setup>
import { defineComponent, ref, watch, computed } from 'vue';
import { usePageChanger } from '../state/pageChanger';
import ProductList from './ProductList.vue';
import { useCartStore } from '../scripts/cart';

    const pageChanger = usePageChanger()
    const cart = useCartStore()
    const ilosc = ref('')
    watch(ilosc, ()=> console.log(ilosc.value), {immediate:true})

    const currentProduct = computed(() => pageChanger.currentProps.product);

    const goBack = () => {
        pageChanger.changePage(defineComponent(ProductList))
    };
    const addToCart = () => {
      cart.addToCart(currentProduct.value, ilosc.value)
    }
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
            <div class="quantity-selector">
              <label for="quantity">Ilość:</label>
              <input v-model.number="ilosc" type="number" id="quantity" value="1" min="1" :max="currentProduct.amount" class="quantity-input">
            </div>   
            <button @click="addToCart" class="addToCart">
              Dodaj do koszyka
            </button>         
          </div>
          <button @click="goBack" class="back-button">Powrót na stronę główną</button>
        </div>
    </main>    
</template>

<style scoped lang="scss">
$green: #81b433;
.product-page {
    display: flex;
flex-direction: column;
 align-items: center;
 padding: 20px;
}

.product-details {
 display: flex;
 gap: 30px;
 margin-bottom: 20px;
 align-items: flex-start;
}

.product-image {
 max-width: 300px;
 height: auto;
 border: 1px solid #ddd;
 border-radius: 8px;
}

.product-info {
 display: flex;
 flex-direction: column;
 gap: 10px;
}

.company {
 font-style: italic;
 color: #777;
}

.price {
 font-size: 1.5em;
 font-weight: bold;
 color: #333;
}

.type {
 font-weight: bold;
}

.dose {
 font-weight: bold;
 color: #555;
}

.amount {
 color: green;
 font-weight: bold;
}

.quantity-selector {
 display: flex;
 align-items: center;
 gap: 10px;
 margin-top: 15px;
}

.quantity-input {
 width: 60px;
 padding: 8px;
 border: 1px solid #ccc;
 border-radius: 4px;
 text-align: center;
}

.add-to-cart-button {
 background-color: #4CAF50;
 color: white;
 padding: 10px 20px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 font-size: 1em;
 margin-top: 20px;
 transition: background-color 0.3s ease;

 &:hover {
 background-color: #367c39;
 }

 &:disabled {
 background-color: #ccc;
 cursor: not-allowed;
 }
}
</style>