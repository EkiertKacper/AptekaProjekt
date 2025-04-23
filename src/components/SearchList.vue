<script setup>
import { watch, ref } from 'vue';

    const props = defineProps({
        query: String
    })

    const handleSearch = async (drugName) => {
  const token = localStorage.getItem("sessionToken");

  if (!drugName) {
    console.error("Brak nazwy leku do wyszukania.");
    return null;
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
    if(data.data == ''){
        console.log('load');
        // return {data:'loading'}
        return
    }
    return data.data; 
  } catch (error) {
    console.error("Wystąpił błąd podczas wysyłania żądania:", error);
    return null;
  }
};

    const results = ref('')
    watch(() => props.query, async () => {
        results.value = await handleSearch(props.query)
    });
</script>

<template>
    <main>
        <ul v-if="results != undefined">
            <li v-for="res in results">
                <div>
                    <img src="../assets/lek.jpeg" alt="Lek">
                    <h2>{{ res.name }}</h2>
                    <p>{{ res.price }}zł</p>
                </div>
            </li>
        </ul>
        <ul v-if="results == null">
            <h2>Niestety nie mamy tego czego szukasz</h2>
        </ul>
    </main>
</template>
<style lang="scss" scoped>
    main{
        // border: 1px solid black;
        background-color: #f0f0f0;
        // padding: 1rem;
        // height: 20%;
        // width:70%;
        // z-index: 1000;
        ul{
            display: flex;
            justify-content: space-around;
            align-items: center;
            list-style: none;
            li{
                height: 150px;
                width: 130px;
                div{
                    background-color: #fff;
                    width: 100%;
                    height: 100%;

                    img{
                        width: 50%;
                    }
                }
            }    
        }
    }
</style>