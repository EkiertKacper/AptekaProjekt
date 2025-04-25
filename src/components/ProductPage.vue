<script setup>
import { defineComponent, ref, watch, computed } from 'vue';
import { usePageChanger } from '../state/pageChanger';
import ProductList from './ProductList.vue';
import { useCartStore } from '../scripts/cart';

    const pageChanger = usePageChanger()
    const cart = useCartStore()
    const ilosc = ref(1)
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
              <p class="dose" v-if="currentProduct.dose">Dawka: {{ currentProduct.dose }}mg</p>
              <p class="amount">Dostępna ilość: {{ currentProduct.amount }}</p>

              <div class="quantity-selector">
                <label for="quantity">Ilość:</label>
                <input v-model.number="ilosc" type="number" id="quantity" value="1" min="1" :max="currentProduct.amount" class="quantity-input">
              </div>   
              <button @click="addToCart" class="addToCart">Dodaj do koszyka</button>     
            </div>    
          </div>
          <button @click="goBack" class="back-button">Powrót na stronę główną</button>
        </div>
    </main>    
</template>
<style lang="scss">
$green: #81b433;
$text-color: #333;
$light-gray: #f2f2f2;
$border-color: #ddd;
$border-radius: 5px;
$box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
$transition: all 0.2s ease-in-out;

.product-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  // Usunięto cień, bo może wyglądać źle na węższych ekranach
}

.product-details {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  padding: 20px;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  max-width: 95%; // Zwiększono max-width na większych ekranach
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
}

.product-image {
  max-width: 300px;
  max-height: 50vh;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;

  @media (max-width: 768px) {
    max-height: 50vh;
  }
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
}

h1 {
  font-size: 1.8em;
  color: $text-color;
  margin-bottom: 3px;
}

.company {
  font-style: italic;
  color: #777;
  font-size: 0.9em;
}

.price {
  font-size: 1.4em;
  font-weight: bold;
  color: $text-color;
}

.type {
  font-weight: bold;
  font-size: 1em;
  color: $text-color;
}

.dose {
  font-weight: bold;
  color: #555;
  font-size: 0.9em;
}

.amount {
  color: $green;
  font-weight: bold;
  font-size: 0.9em;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

label {
  font-weight: bold;
  font-size: 1em;
  color: $text-color;
}

.quantity-input {
  width: 50px;
  padding: 6px;
  border: 1px solid $border-color;
  border-radius: 3px;
  text-align: center;
  font-size: 0.9em;
}

.addToCart {
  background-color: $green;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  font-size: 1em;
  margin-top: 15px;
  transition: $transition;
  box-shadow: $box-shadow;

  &:hover {
    background-color: darken($green, 10%);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
}

.back-button {
  background-color: transparent;
  color: $text-color;
  border: 1px solid $border-color;
  padding: 8px 15px;
  border-radius: $border-radius;
  cursor: pointer;
  font-size: 0.9em;
  margin-top: 20px;
  transition: $transition;

  &:hover {
    background-color: $light-gray;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
}
</style>
