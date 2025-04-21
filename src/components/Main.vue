<script setup>
import { ref, onMounted } from 'vue';

const data = ref('');
const showMobileMenu = ref(false); // NEW

const fetchData = async () => {
  const token = localStorage.getItem("sessionToken");
  const requestBody = {
    page: 0,
    limit: 10,
  };

  try {
    const response = await fetch("http://localhost:3030/api/v1/listDrugs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(requestBody),
    });

    const fullData = await response.json();
    data.value = fullData.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchData();
});
</script>


<template>
  <div class="main">
 
    <aside class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>Strona główna</li>
        <li>Kategorie</li>
        <li>Ulubione</li>
        <li>Ustawienia</li>
      </ul>
    </aside>

     
    <div class="mobile-header">
      <button class="hamburger" @click="showMobileMenu = !showMobileMenu">
        ☰
      </button>
    </div>

     
    <transition name="slide">
      <div v-if="showMobileMenu" class="mobile-menu">
        <ul>
          <li @click="showMobileMenu = false">Strona główna</li>
          <li @click="showMobileMenu = false">Kategorie</li>
          <li @click="showMobileMenu = false">Ulubione</li>
          <li @click="showMobileMenu = false">Ustawienia</li>
        </ul>
      </div>
    </transition>

      
    <div class="content">
      <div class="header">
        <h1>Witaj w aplikacji</h1>
        <button><i class="fa-regular fa-cart-shopping" style="color: #000000;"></i></button>
      </div>

      <div class="container">
        <ul>
          <li v-for="item in data">
            <img src="../assets/lek.jpeg" alt="zdjęcie" />
            <div class="values">
              <div class="info">
                <p>{{ item.name }}</p>
                <p class="cena">{{ item.price }}zł</p>
              </div>

              <label for="ilosc" class="ilosc"> Ilość:
                <select name="ilosc">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>

              <button class="dodawanie">+</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

html {
  background-color: transparent;
}

$green: #00ffbf;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$black: #000;
$gray: #666;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

.main {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

// --- SIDEBAR (DESKTOP) ---
.sidebar {
  width: 220px;
  background-color: $green;
  padding: 16px;
  color: $black;

  h2 {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
}

// --- MOBILE HEADER + MENU ---
.mobile-header {
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    padding: 12px;
    background-color: $green;

    .hamburger {
      font-size: 28px;
      background: none;
      border: none;
      color: $black;
      cursor: pointer;
    }
  }
}

.mobile-menu {
  position: absolute;
  top: 56px;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 999;
  box-shadow: $shadow;
  padding: 20px 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 12px 24px;
      border-bottom: 1px solid #ddd;
      color: $black;
      font-size: 18px;

      &:hover {
        background-color: $light-gray;
      }
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

// --- MAIN CONTENT + HEADER ---
.content {
  flex: 1;
  display: flex;
  flex-direction: column;

  .header {
    background-color: $green;
    padding: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    box-shadow: $shadow;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 20px;
      font-weight: bold;
      color: $black;
    }

    button {
      background-color: transparent;
      border: none;
      height: 20px;
      width: 20px;
    }
  }

  .container {
    padding: 12px;
    flex: 1;
    overflow-y: auto;

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }

    li {
      width: 280px;
      background-color: white;
      border-radius: 12px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: $shadow;

      img {
        width: 170px;
        height: 170px;
        border-radius: 8px;
        object-fit: cover;
        margin-bottom: 8px;
        box-shadow: $shadow;
      }

      .values {
        
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin-top: 8px;

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;

          p:first-of-type {
            font-size: 16px;
            font-weight: bold;
            color: $black;
            margin: 4px 0;
          }

          .cena {
            font-size: 14px;
            font-weight: bold;
            color: $black;
            margin: 2px 0;
          }
        }

        label.ilosc {
          margin-left: 70px;
          font-size: 14px;
          color: $black;
          display: flex;
          align-items: center;

          select {
            height: 40px;
            // width: 100%;
          //   padding: 10px 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: white;
            color: #333;
            font-size: 16px;
            margin-left: 8px;
          }
        }

        .dodawanie {
          margin-top: 8px;
          background-color: $green;
          color: $black;
          border: 1px solid black;
          border-radius: 100%;
          width: 28px;
          height: 28px;
          font-size: 20px;
          line-height: 0;
          padding: 0;
          box-shadow: $shadow;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            background-color: darken($green, 10%);
          }

          &:active {
            background-color: lighten($green, 10%);
          }
        }
      }
    }
  }
}

</style> 