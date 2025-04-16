<template>
<div class="container">
    <button class="backButton">Wróć</button>
</div>
<div class="mainContainer">
<div class="userUi">
    <div class="menuItem" v-for="item in menuItems" :key="item.text">
            <span class="icon">{{ item.icon }}</span>
            <span class="label">{{ item.text }}</span>
          </div>
  </div>
<div class="scrollContainer">
  <div class="orderSection">

    <div class="orderCard" v-for="i in 20" :key="i"> 
        
      <div class="orderInfo">
        <h3>Dane zamówienia:</h3>
        <p class="orderDate">27 marca 2025</p>
        <p class="orderId">ID: 123456</p>
        <p class="orderPrice">854,98 zł</p>
      </div>
      <div class="imgPreview">
        <div class="fakeImg"></div>
        <div class="fakeImg"></div>
        <div class="fakeImg"></div>
      </div>
    </div>
  </div>

</div>
</div>
</template>
<script setup>
const menuItems = [
    { icon: '👤', text: 'Konto' },
    { icon: '🧾', text: 'Historia zamówień' },
    { icon: '🛒', text: 'Koszyk'},
    { icon: '🎟️', text: 'Kupony' },
    { icon: '📞', text: 'Skontaktuj się z nami' },
  
    ]
</script>
<style lang="scss" scoped>
*{
  padding: 0;margin: 0;box-sizing: border-box;
}

.container {
  height: 10vh;

  .backButton {
    padding: 1rem 1.5rem;
    margin-left: 1.4rem;
    margin-top: 1.4rem;
    border-radius: 10px;
    border: none;
  }
}
.userUi{
  display: none;

}
.scrollContainer {
  display: flex;
  scrollbar-width: none;
  -ms-overflow-style: none;
  justify-content: center;
  width: 100%;
  height: 70vh; 
  overflow-y: auto;
  background-color: #1a1a1a;

  &::-webkit-scrollbar {
    display: none;
  }

  .orderCard {
    display: flex;
    flex-direction: row;
    background-color: #2b2b2b;
    font-size: 0.85rem;
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    margin-bottom: 1.4rem;
    margin-top: 1rem;


    .orderInfo {
      width: 35%;
      padding: 1rem;
      

      .orderPrice {
        font-weight: bold;
      }
      .orderId {
          color: #aaa;
          font-size: 0.9rem;
        }
    }

    .imgPreview {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #1f1f1f;
      width: 65%;
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      


      .fakeImg {
        width: 50px;
        height: 50px;
        background-color: black;
        margin-left: 20px;
        border-radius: 10px;
      }
    }
  }
}
@media (min-width: 768px) {


}


  

</style>