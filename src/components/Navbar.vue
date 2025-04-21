<script setup>
import { ref, defineComponent, shallowRef } from "vue";
import { usePageChanger } from "../state/pageChanger"

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
            pageChanger.changePage(page1)
            currentPage.value = page1
            break
        case "produkty": 
            pageChanger.changePage(page2)
            currentPage.value = page2
            break;
    }
}
</script>

<template>
    <nav>
        <div id="glowna" class="box" @click="switcher">
            <p class="navItem"><span class="material-symbols-outlined">home</span></p>
        </div>    
        <div id="produkty" class="box" @click="switcher">
            <p class="navItem"><span class="material-symbols-outlined">shopping_bag</span></p>
        </div>         
        <div class="box" @click="switcher">
            <p class="navItem"><span class="material-symbols-outlined">person</span></p>
        </div> 
    </nav>

</template>

<style scoped lang="scss">
    $mint: #57FF90;
    nav{
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
</style>