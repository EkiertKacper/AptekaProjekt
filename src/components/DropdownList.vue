<script setup>
import { ref } from "vue";
import MenuItems from "./MenuItems.vue"; // Import komponentu MenuItems

const isMenuOpen = ref(false); // Kontroluje widoczność menu hamburgerowego

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value; // Przełącz widoczność menu
};
</script>

<template>
  <div>
    <!-- Przycisk hamburgera widoczny tylko w wersji mobilnej -->
    <button class="hamburger-button" @click="toggleMenu">
      <span class="material-icons">menu</span>
    </button>

    <!-- Menu rozwijane w wersji mobilnej -->
    <div v-if="isMenuOpen" class="menu-overlay">
      <MenuItems />
    </div>

    <!-- Obecna struktura dla wersji desktopowej -->
    <div class="left-section">
      <MenuItems />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

$green: #81b433;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$black: #000;

/* Styl przycisku hamburgera */
.hamburger-button {
 display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  background-color: $green;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: $shadow;

  .material-icons {
    font-size: 24px;
  }
}


.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $light-gray;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.left-section {
  flex-basis: 20%;
  max-width: 100%;
  height: 100%;
  background-color: $light-gray;
  padding: 20px;
  box-shadow: $shadow;
  border-radius: 8px;
  margin-right: 20px;
}


@media screen and (max-width: 1250px) {
  .left-section {
    display: none;
  }

  .hamburger-button {
    display: flex; 
  }
}
@media screen and (min-width: 1251px) {
  .hamburger-button {
    display: none;
  }
}
</style>