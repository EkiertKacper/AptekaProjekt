<script setup>
import { defineComponent } from 'vue';
import { useMenuPage } from '../state/menuPage';
import Cart from './Cart.vue';
import Orders from './Orders.vue';
import Account from './Account.vue';

const menuPage = useMenuPage()
  const userPanelMenuOption = (e) => {
    switch(e.target.id) {
      case 'konto':
        menuPage.changePage(defineComponent(Account)) // Do zmiany jak powstranie user
        break;
      case 'zamowienia':
        menuPage.changePage(defineComponent(Orders))  
        break;
      case 'koszyk':
        menuPage.changePage(defineComponent(Cart))  
    }
  }
</script>

<template>
  <ul>
    <li @click="userPanelMenuOption" id="konto">Konto</li>
    <li @click="userPanelMenuOption" id="zamowienia">Zamówienia</li>
    <li @click="userPanelMenuOption" id="koszyk">Koszyk</li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-weight: bold;
    color: #000;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #81b433;
      color: white;
    }
  }
}
</style>