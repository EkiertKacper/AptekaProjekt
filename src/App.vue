<script setup>
    import {ref} from 'vue'
    import Main from './components/Main.vue';
    import LogPage from './components/LogPage.vue'
    import OrderHistory from './components/userView/orderHistory.vue'

    const isLogged = ref(false)
    
</script>

<template>
    <LogPage v-if="!isLogged" @logged="()=>isLogged = true"/>
    <component v-if="isLogged" :is="OrderHistory"></component>
</template>