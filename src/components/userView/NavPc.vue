<script setup>
const menuItems = [
  {
    label: "Strona główna",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Z"/></svg>`,
  },
  {
    label: "Produkty",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>',
  },
  {
    label: "Konto",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#333"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>`,
  },
];
</script>

<template>
  <div class="navBar-pc">
    <div class="logo-section">
      <img
        src="../../assets/logo-transparent.png"
        class="logo-img"
        alt="logo przedstawiające liść"
      />
      <h1 class="logo-text">Zdrowix</h1>
    </div>
    <div class="main-section">
      <div class="separator"></div>
      <div class="menu-option" v-for="(item, index) in menuItems" :key="index">
        <span class="icon" v-html="item.icon"></span>
        <span class="label">{{ item.label }}</span>
      </div>
      <div class="separator"></div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.navBar-pc {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  height: 100vh;
  background-color: #1a3d2f; // ciemna zieleń, naturalna
  color: white;
  font-family: 'Poppins', sans-serif;

  .logo-section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
    background-color: #c4d6b0; // jasny beż

    .logo-img {
      height: 60px;
      width: auto;
    }

    .logo-text {
      font-size: 1.8rem;
      font-weight: bold;
      color: #1a3d2f;
    }
  }

  .separator {
    background-color: #3d5f4d;
    width: 100%;
    height: 1px;
    margin: 10px 0;
  }

  .main-section {
    width: 100%;
    padding: 0 10px;
  }

  .menu-option {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    transition: background 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: #2f4f3e;
    }

    .icon {
      display: flex;
      align-items: center;
      margin-right: 12px;

      svg {
        fill: #fff;
        width: 24px;
        height: 24px;
      }
    }

    .label {
      font-size: 1.1rem;
    }
  }
}

</style>
