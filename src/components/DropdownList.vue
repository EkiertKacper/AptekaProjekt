<script setup>
import MenuItems from "./MenuItems.vue"; 
</script>

<template>
  <div>
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

}

</style>