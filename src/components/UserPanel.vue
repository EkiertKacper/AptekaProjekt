<script setup>
import { ref, onMounted, defineComponent } from "vue";
import DropdownList from "./DropdownList.vue";
import { useMenuPage } from "../state/menuPage";

const menuPage = useMenuPage();

const fetchData = async () => {
  const token = localStorage.getItem("sessionToken");
  const requestBody = {
    page: 0,
    limit: 10,
  };
};
onMounted(() => {
  fetchData();
});
</script>

<template>
  <main>
    <div class="container">
      <DropdownList />
      <div class="right-section">
        <component :is="menuPage.currentMenuPage" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
$green: #81b433;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$black: #000;
$gray: #666;

main {
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 80vh;

  .container {
    display: flex;
    padding: 12px;
    justify-content: space-between;
    min-height: 90vh;

    .right-section {
      flex-grow: 1;
      background-color: white;
      padding: 20px;
      box-shadow: $shadow;
      border-radius: 8px;
    }
  }
}
@media screen and (min-width: 1250px) {
  .container {
    margin-right: 10%;
  }
}
@media screen and (max-width: 1250px) {
  .container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-left: none;

    .right-section {
      width: 100%;
      max-width: 600px;
      background-color: white;
      padding: 20px;
      box-shadow: $shadow;
      border-radius: 8px;
      .horizontal-scroll {
        padding: 10px;
      }
    }
  }
}
</style>
