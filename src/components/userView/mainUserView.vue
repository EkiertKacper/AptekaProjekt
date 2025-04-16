<template>
    <div class="container">
      <div class="header">
        <div class="profile">
          <div class="avatar"></div>
          <div class="loginText">Login/Sign Up</div>
        </div>
      </div>
  
      <div class="content">
        <div class="menu">
          <div class="menuItem" v-for="item in menuItems" :key="item.text">
            <span class="icon">{{ item.icon }}</span>
            <span class="label">{{ item.text }}</span>
          </div>
        </div>
      </div>
  
      <div class="footer"></div>
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
    margin: 0;
    padding: 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
  }
  
  .header {
    background: linear-gradient(135deg, #2af598, #009efd);
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  
    .profile {
      display: flex;
      align-items: center;
      gap: 1rem;
  
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #ccc;
        border-radius: 50%;
      }
  
      .loginText {
        font-weight: bold;
        font-size: 1.2rem;
        text-decoration: underline;
        color: #111;
      }
    }
  }
  
  .content {
    flex: 1;
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

  
    .menu {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
  
      .menuItem {
        display: flex;
        align-items: center;
        background: linear-gradient(90deg, #50f295, #41e0b8);
        border-radius: 12px;
        padding: 1rem;
        font-weight: 600;
        color: #333;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
  
        &:hover {
          transform: scale(1.02);
          cursor: pointer;
        }
  
        .icon {
          margin-right: 1rem;
          font-size: 1.3rem;
        }
      }
    }
  }
  
  .footer {
    background-color: steelblue;
    width: 100%;
    height: 10vh;
  }
  
  @media (min-width: 769px) {
    .container {
      max-width: 768px;
      margin: auto;
    }
  }
  </style>