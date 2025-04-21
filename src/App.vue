<script setup>
    import {ref} from 'vue'
    import Main from './components/Main.vue';
    import LogPage from './components/LogPage.vue'
    import DragPage from './components/DragPage.vue';

    const isLogged = ref(false)
    
</script>

<template>
    <LogPage v-if="!isLogged" @logged="()=>isLogged = true"/> 
    <component v-if="isLogged" :is="Main"></component>
    <!-- <DragPage/> -->
</template>