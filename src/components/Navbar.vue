<script setup>
import { ref, defineComponent, shallowRef, onMounted, watch } from "vue";
import { usePageChanger } from "../state/pageChanger"
import MainPage from "./MainPage.vue";
import ProductList from './ProductList.vue'
import UserPanel from "./UserPanel.vue";

const props = defineProps({
  isLargeScreen: {
    type: Boolean
  }
});
const nav = ref(null)
let lastScrollY;
onMounted(() => {
  lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (!nav.value) return;

    if (window.scrollY > lastScrollY) {
      nav.value.style.transform = "translateY(100%)";
    } else {
      nav.value.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;
  });
});

const pageChanger = usePageChanger()
const currentPage = ref(pageChanger.currentPage)
const prev = ref('')
const switcher = (e) => {
    if(prev.value){
        if(prev.value !== e.currentTarget){
            prev.value.classList.toggle("checked")
            const item = e.currentTarget
            item.classList.toggle("checked")
            prev.value = item
        }
    } else{
        const item = e.currentTarget
        item.classList.toggle("checked")
        prev.value = item
    }
    switch(e.currentTarget.id){
        case "glowna":
            pageChanger.changePage(defineComponent(MainPage))
            break
        case "produkty": 
            pageChanger.changePage(defineComponent(ProductList))
            break;
        case "ustawienia":
            pageChanger.changePage(defineComponent(UserPanel))    
    }
}
const emit = defineEmits(['logout'])
const logout = () => {
  localStorage.clear('sessionToken')
  emit('logout', 'wylogowano')
}
</script>

<template>
    <nav ref="nav" class="mobileNav" v-if="!props.isLargeScreen">
        <div id="glowna" class="box" @click="switcher">
            <p class="navItem"><span class="material-symbols-outlined">home</span></p>
        </div>    
        <div id="produkty" class="box" @click="switcher">
            <p class="navItem"><span class="material-symbols-outlined">shopping_bag</span></p>
        </div>         
        <div id="ustawienia" class="box" @click="switcher">
            <p class="navItem"><span class="material-symbols-outlined">person</span></p>
        </div> 
    </nav>

    <nav class="desktopNav" v-if="props.isLargeScreen">
        <div class="navBar-pc">
            <div class="logo-section" id="glowna" @click="switcher">
              <img
                src="../assets/logo-transparent.png"
                class="logo-img"
                alt="logo przedstawiające liść"
              />
              <h1 class="logo-text">Zdrowix</h1>
            </div>
            <div class="main-section">
              <div class="separator"></div>

                <div class="menu-option" id="glowna" @click="switcher">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Z"/></svg>
                  <p class="label">Strona główna</p>
                </div>

                <div class="menu-option" id="produkty" @click="switcher">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
                  <p class="label">Produkty</p>
                </div>

                <div class="menu-option" id="ustawienia" @click="switcher">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#333"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>
                  <p class="label">Konto</p>
                </div>
              <div class="separator"></div>
              </div>
              <div class="logout">
              <div class="menu-option" @click="logout">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                <p class="label">Wyloguj się</p>
              </div>
              </div>
        </div>

    </nav>
</template>

<style scoped lang="scss">
    $mint: #6b9922;
    .mobileNav{
        transition: transform 0.3s ease-in-out;
        transform: translateY(0);
        width: 100vw;
        border-radius: 1rem 1rem 0 0;
        display: flex;
        justify-content: space-around;
        background-color: $mint;
        position: fixed;
        bottom: 0;
        z-index: 1000;
        .box{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 7rem;
            height: 5rem;
            position: relative; 
            overflow: auto;
            p{
                color: #000;
                .material-symbols-outlined{
                    font-size: 32px;
                }
            }            
            &::after{
                z-index: -1;
                content: "";
                position: absolute;
                bottom: 30%;
                width: 32px;
                height: 3px;     
                background-color: black;    
                border-radius: 999px;
                transform: scaleX(0); 
                transition: transform 0.2s ease-in; 
                transform-origin: right;
            }
            &::before{
                position: absolute;
                z-index: -1;
                content: "";
                height: 50px;
                width: 50px;
                border-radius: 100%;
                background-color: transparent;
                transition: background-color 0.2s ease-in, box-shadow 0.2s;
            }
            &.checked{
                &::after{
                    transform-origin: left;
                    transform:scaleX(1);                    
                }
                &::before{
                background-color: #f0f0f0;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            }
            }
        }
    }

@media screen and (min-width: 1251px) {
.desktopNav{
    position: fixed;
    top:0;
    .navBar-pc {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 13vw;
      height: 100vh;
      background-color: #f0f0f0;
      color: black;
      font-family: 'Poppins', sans-serif;
      overflow: hidden;

      .logo-section {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;

        .logo-img {
          height: 15vh;
          cursor: pointer;
        }

        .logo-text {
          display: none;
        
        }
      }

      .separator {
        background-color: #d0d0d0;
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
        cursor: pointer;

        &:hover {
          background-color: #6b9922;
          color: #fff;
        }
        &:active{
          filter: brightness(0.75);
        }

        .icon {
          display: flex;
          align-items: center;
          margin-right: 12px;

          svg {
            fill: #000;
            width: 24px;
            height: 24px;
          }
        }

        .label {
          font-size: 1.1rem;
        }
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  .desktopNav{
    position: fixed;
    top:0;
    .navBar-pc {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 8vw;
      height: 100vh;
      background-color: #f0f0f0;
      color: black;
      font-family: 'Poppins', sans-serif;
      overflow: hidden;

      .logo-section {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5%;

        .logo-img {
          width: 100%;
          cursor: pointer;
        }

        .logo-text {
          display: none;
        }
      }

      .separator {
        background-color: #d0d0d0;
        width: 100%;
        height: 1px;
      }

      .main-section {
        width: 100%;
      }

      .menu-option {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background-color: #6b9922;
          color: #fff;
        }
        &:active{
          filter: brightness(0.75);
        }

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 50% 0;
        }

        .label {
          display: none;
        }
      }
    }
  }
}
.logout{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10% 0;
  justify-content: end;
}
</style>