<script setup>
    import {onMounted, onUnmounted, ref, computed} from 'vue'
    import LogPage from './components/LogPage.vue'
    import Navbar from './components/Navbar.vue';
    import SearchBar from './components/SearchBar.vue';
    import { usePageChanger } from './state/pageChanger';

    const isLogged = ref(false)
    const isLargeScreen = ref(window.innerWidth > 768);
    const windowWidth = ref(window.innerWidth);
    const pageChanger = usePageChanger()
    
    const margin = computed(() => {
      if (isLargeScreen.value) {
        if (windowWidth.value > 1250) {
          return { marginLeft: '13vw' };
        } else {
          return { marginLeft: '8vw' };
        }
      } else {
        return { marginLeft: '' };
      }
    });

    const updateScreenSize = () => {
      isLargeScreen.value = window.innerWidth > 768;
      windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
      window.addEventListener('resize', updateScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateScreenSize);
    });
</script>

<template>
    <SearchBar v-if="isLogged" :style="[margin]"/>
    <Navbar :isLargeScreen="isLargeScreen" v-if="isLogged" @logout="()=>isLogged=!isLogged"/>
    <LogPage v-if="!isLogged" @logged="()=>isLogged = !isLogged"/> 
    <component :style="[margin]" v-if="isLogged" :is="pageChanger.currentPage"></component>
</template>
<style>
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}
</style>
