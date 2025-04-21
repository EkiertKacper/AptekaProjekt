<script setup>
    import {ref} from 'vue'
    import ProductList from './components/ProductList.vue';
    import LogPage from './components/LogPage.vue'
    import DragPage from './components/DragPage.vue';
    import Navbar from './components/Navbar.vue';

    const isLogged = ref(false)
    
</script>

<template>
    <Navbar v-if="isLogged"/>
    <LogPage v-if="!isLogged" @logged="()=>isLogged = true"/> 
    <component v-if="isLogged" :is="ProductList"></component>

</template>
<style>
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}
</style>
