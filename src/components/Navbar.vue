<script setup>
import { ref, defineComponent, shallowRef, onMounted, watch } from "vue";
import { usePageChanger } from "../state/pageChanger"

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
        if(prev.value === e.currentTarget){
            prev.value.classList.toggle("checked")
            prev.value = ''
        } else{
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
            pageChanger.changePage()
            currentPage.value = 0
            break
        case "produkty": 
            pageChanger.changePage()
            currentPage.value = 0
            break;
        case "ustawienia":
            pageChanger.changePage()    
            currentPage.value = 0
    }
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
        <h1 style="color: black;">Bedzie navbar</h1>
    </nav>
</template>

<style scoped lang="scss">
    $mint: #57FF90;
    .mobileNav{
        transition: transform 0.3s ease-in-out;
        transform: translateY(0); // domyślnie widoczny
        width: 100vw;
        border-radius: 1rem 1rem 0 0;
        display: flex;
        justify-content: space-around;
        background-color: $mint;
        position: fixed;
        bottom: 0;
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
                background-color: white;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            }
            }
        }
    }
    .desktopNav{
        display: flex;
        position: fixed;
        height: 100vh;
        width: 13vw;
        background-color: gold;
    }
</style>