<script setup>
    import {ref} from 'vue'
    const data = ref('')
    const fetchData = async () => {
        const token = localStorage.getItem("sessionToken")
        const requestBody = {
        page: 0,
        limit: 10,
      };

      try {
        const response = await fetch("http://localhost:3030/api/v1/listDrugs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify(requestBody),
        });

        const fullData = await response.json()
        data.value = fullData.data

      } catch (error) {
        console.log(error);
      }
    }
</script>

<template>

    


    <div class="main">

        <div class="header">
            <h1>Witaj w aplikacji</h1>
        </div>

        <div class="container">
            <ul>
                <li>
                    <img src="../assets/lek.jpeg" alt="#">
                    <p>Nazwa leku</p>
                    <p>Cena</p>
                </li>
                <li>
                    <img src="../assets/lek.jpeg" alt="#">
                    <p>Nazwa leku</p>
                    <p>Cena</p>
                </li>
                <li>
                    <img src="../assets/lek.jpeg" alt="#">
                    <p>Nazwa leku</p>
                    <p>Cena</p>
                </li>
            </ul>
        </div>
        
        <div class="footerNav">
            <h1 class="material-symbols-outlined"> login</h1>
        </div>

    </div>


    

</template>


<style scoped lang="scss">


</style>