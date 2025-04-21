<script setup>
    import {ref} from 'vue'
    import Main from './components/Main.vue';
    import LogPage from './components/LogPage.vue'
    import DragPage from './components/DragPage.vue';
    import Navbar from './components/Navbar.vue';

    const isLogged = ref(false)
    
</script>

<template>
    <Navbar v-if="isLogged"/>
    <LogPage v-if="!isLogged" @logged="()=>isLogged = true"/> 
    <component v-if="isLogged" :is="Main"></component>

</template>
