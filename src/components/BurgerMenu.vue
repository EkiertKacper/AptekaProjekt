<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false); // Kontroluje widoczność menu

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value; // Przełącz widoczność menu
};
</script>

<template>
  <div>
    <!-- Przycisk hamburgera -->
    <button class="hamburger-button" @click="toggleMenu">
      <span class="material-icons">menu</span>
    </button>

    <!-- Menu rozwijane -->
    <div v-if="isMenuOpen" class="menu-overlay">
      <ul>
        <li>Konto</li>
        <li>Zamówienia</li>
        <li>Koszyk</li>
      </ul>
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

/* Styl menu rozwijanego */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $light-gray;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    li {
      font-size: 24px;
      font-weight: bold;
      color: $black;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: $green;
      }
    }
  }
}

/* Ukrycie menu hamburgerowego w wersji desktopowej */
@media screen and (min-width: 1250px) {
  .hamburger-button {
    display: none;
  }

  .menu-overlay {
    display: none;
  }
}
</style>