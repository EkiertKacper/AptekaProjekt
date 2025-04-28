<script setup>
import { ref } from 'vue';
import { useMenuPage } from '../state/menuPage';
import { usePageChanger } from '../state/pageChanger';
import Cart from './Cart.vue';
import Orders from './Orders.vue';
import Account from './Account.vue';
import UserPanel from './UserPanel.vue';

const pageChanger = usePageChanger();
const menuPage = useMenuPage();
const prev = ref(null);

const userPanelMenuOption = (e) => {
  const item = e.currentTarget;

  switch (item.id) {
    case "account":
      pageChanger.changePage(UserPanel);
      menuPage.changePage(Account);
      break;
    case "orders":
    pageChanger.changePage(UserPanel);
      menuPage.changePage(Orders);
      break;
    case "settings":
      pageChanger.changePage(UserPanel);
      menuPage.changePage(Cart);
      break;
  }
};
</script>

<template>
  <ul>
    <li @click="userPanelMenuOption" id="account">Konto</li>
    <li @click="userPanelMenuOption" id="orders">Zamówienia</li>
    <li @click="userPanelMenuOption" id="settings">Koszyk</li>
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