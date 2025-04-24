<script setup>
import { watch, ref } from 'vue';

    const props = defineProps({
        query: String
    })
    const loading = ref(false)
    const emptySearch = ref(true)
    const first = ref(false)

    const handleSearch = async (drugName) => {
    const token = localStorage.getItem("sessionToken");
      emptySearch.value = false
    if (!drugName) {
      emptySearch.value = true
      return null
    }

    const requestBody = {
      page: 0,
      limit: 5,
      filter: [
        { name: drugName }
      ],
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Błąd pobierania leków:", errorData);
        return null;
      }


      const data = await response.json();
      if(data.data && data.data.length === 0){
        loading.value = true;
        await new Promise(resolve => setTimeout(() => {
          loading.value = false;
          console.log('xD');
          resolve(null); 
        }, 2000));
        return null;
      }
      return data.data; 
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania żądania:", error);
      return null;
    }
};

    const results = ref('')
    watch(() => props.query, async () => {
        first.value = true
        results.value = await handleSearch(props.query)
    });
</script>

<template>
    <main v-if="first">
        <ul v-if="results != undefined && !loading">
            <li v-for="res in results">
                <div>
                    <img :src="res.image" alt="Lek">
                    <h2>{{ res.name }}</h2>
                    <p>{{ res.price.toFixed(2) }}zł</p>
                </div>
            </li>
        </ul>
        <ul v-if="results == null && !emptySearch">
            <h2>Niestety nie mamy tego czego szukasz</h2>
        </ul>
        <ul v-if="emptySearch">
          <h2>Musisz coś wpisać</h2>
        </ul>
        <ul v-if="loading">
          <div class="loading-container">
            <div class="loading-spinner"></div>
          </div>
        </ul>
    </main>
</template>

<style lang="scss" scoped>
    main{
        background-color: #f0f0f0;
        ul{
            display: flex;
            justify-content: space-around;
            align-items: center;
            list-style: none;
            height: 150px;
            li{
                height: 150px;
                width: 130px;
                div{
                    background-color: #fff;
                    width: 100%;
                    height: 100%;

                    img{
                        width: 100%;
                        max-height: 90px;
                    }
                }
            }    
        }
    }
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }

    .loading-spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #81b433;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
</style>