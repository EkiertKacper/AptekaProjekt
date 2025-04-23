<template>
  <ul>
    <li>Konto</li>
    <li>Zamówienia</li>
    <li>Koszyk</li>
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