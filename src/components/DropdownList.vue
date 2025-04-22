<script setup>

</script>


<template>
  <div class="left-section">
    <ul>
      <li>Konto</li>
      <li>Zamówienia</li>
      <li>Koszyk</li>
    </ul>
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
  max-width: 30%;
  background-color: $light-gray;
  padding: 20px;
  box-shadow: $shadow;
  border-radius: 8px;
  margin-right: 20px;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      padding: 10px;
      background-color: $light-gray;
      border-radius: 8px;
      box-shadow: $shadow;
      cursor: pointer;
      font-weight: bold;
      color: $black;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: $green;
        color: white;
      }
    }
  }
}


 
@media screen and (max-width: 1250px) {
  .left-section {
    display: none;
  }

}
</style>