<script setup>
import { ref } from "vue";
import MenuItems from "./MenuItems.vue";

const isMenuOpen = ref(false);

const openMenu = () => { isMenuOpen.value = true; };
const closeMenu = () => { isMenuOpen.value = false; };
</script>

<template>
  <div>
    <button class="open-menu-btn" @click="openMenu">
      <span class="material-icons">menu</span> 
    </button>
    <div v-if="isMenuOpen" class="side-menu-backdrop" @click.self="closeMenu">
      <nav class="side-menu">
        <button class="close-btn" @click="closeMenu">
          <span class="material-icons">close</span>
        </button>
        <MenuItems style="margin-top: 20px;"/>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

$green: #81b433;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

.open-menu-btn {
  background: $green;
  color: #fff7f7;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  
  cursor: pointer;
  box-shadow: $shadow;
  margin-right: 10px;
  .material-icons { font-size: 24px; }
  @media (min-width: 1251px) {
    display: none;
  }
}

.side-menu-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 2000;
  display: flex;
}

.side-menu {
  width: 40vw;
  max-width: 340px;
  min-width: 220px;
  height: 100vh;
  background: $light-gray;
  box-shadow: $shadow;
  padding: 28px 18px 18px 18px;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideIn 0.25s ease-out both;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.close-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  .material-icons { font-size: 28px; }
}

@media (min-width: 1251px) {
  .open-menu-btn, .side-menu-backdrop { display: none; }
}
</style>