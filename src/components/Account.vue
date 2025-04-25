<script setup>
import { onMounted, ref } from 'vue';

    const data = ref('')

    const fetchData = async () => {
        const token = localStorage.getItem('sessionToken');

        if (!token) {
          console.error('Brak tokenu autoryzacyjnego.');
          return;
        }

        try {
          const response = await fetch("http://localhost:3030/api/v1/me", {
            method: 'GET',
            headers: {
              'authorization': `${token}`
            },
          })
          const userData = await response.json();
          data.value = userData
        } catch (error) {
          console.error('Wystąpił błąd:', error);
        }
    }

    onMounted(()=> {
        fetchData()
    })
</script>

<template>
    <main>
        <img src="../assets/user.png" alt="użytkownik">
        <p>Imię: {{ data.name }}</p>
        <p>Nazwisko: {{ data.surname }}</p>
        <p>Adres email: {{ data.email }}</p>
    </main>

</template>

<style lang="scss" scoped> 
    main{
        display: flex;
        flex-direction: column;
        align-items: center;

        img{
            width: 200px;
            margin: 20px;
        }
        p{
            font-size: 24px;
        }
    }
</style>