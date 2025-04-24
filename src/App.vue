<script setup>
    import {onMounted, ref, computed} from 'vue'
    import LogPage from './components/LogPage.vue'
    import Navbar from './components/Navbar.vue';
    import SearchBar from './components/SearchBar.vue';
    import { usePageChanger } from './state/pageChanger';

    const isLogged = ref(false)
    const isLargeScreen = ref(false);
    const pageChanger = usePageChanger()
    
    const margin = computed(() => ({
      marginLeft: isLargeScreen.value ? '13vw' : ''
    }));
    function updateScreenSize() {
      isLargeScreen.value = window.innerWidth > 768;
    }
    onMounted(()=>{
        updateScreenSize()
        window.addEventListener('resize', updateScreenSize);
    })
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
