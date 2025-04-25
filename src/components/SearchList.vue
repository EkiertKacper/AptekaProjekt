<script setup>
import { watch, ref, defineComponent } from 'vue';
import { usePageChanger } from '../state/pageChanger';
import ProductPage from './ProductPage.vue';

  const pageChanger = usePageChanger()
    const props = defineProps({
        query: String
    })
    const loading = ref(false)
    const emptySearch = ref(true)
    const first = ref(false)
    const isSearchListActive = ref(false)
    const emit = defineEmits(['isSearchListActive'])

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
      const newData = data.data.filter(item => item.amount !== 0);
      data.data = newData;
      if(data.data && data.data.length === 0){
        loading.value = true;
        await new Promise(resolve => setTimeout(() => {
          loading.value = false;
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
    const openProductPage = (itemId) => {
      const selectedItem = results.value.find(item => item.idDrug === itemId);
      pageChanger.changePage(defineComponent(ProductPage), {product: selectedItem})
    }
</script>

<template>
    <main v-if="first" @mouseenter="emit('isSearchListActive', true)" @mouseleave="emit('isSearchListActive', false)">
        <ul v-if="results != undefined && !loading">
            <li v-for="res in results" @click="openProductPage(res.idDrug)">
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
    main {
        background-color: rgba(240, 240, 240, 0.5); // Półprzezroczyste tło
        position: relative; // Ustawienie pozycji względem innych elementów
        z-index: 10; // Wyższy priorytet warstwy, aby przysłaniać inne elementy

        ul {
            display: flex;
            justify-content: flex-start; // Elementy wyrównane do początku
            align-items: center;
            list-style: none;
            height: auto;
            gap: 20px; // Odstępy między elementami
            flex-wrap: nowrap; // Elementy w jednym rzędzie
            overflow-x: auto; // Przewijanie w poziomie
            padding: 10px;
            scrollbar-width: thin; // Cieńszy pasek przewijania (dla przeglądarek wspierających)
            background-color: rgba(255, 255, 255, 0.85); // Półprzezroczyste tło dla wyników
            border: 0.5px solid #999;
            border-radius: 12px; // Zaokrąglenie rogów
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); // Lekki cień
            position: absolute; // Ustawienie listy wyników nad innymi elementami
            top: 0; // Pozycja względem rodzica (main)
            left: 0;
            right: 0;
            z-index: 20; // Wyższy priorytet warstwy niż main

            &::-webkit-scrollbar {
                height: 8px; // Wysokość paska przewijania
            }

            &::-webkit-scrollbar-thumb {
                background-color: #ccc; // Kolor paska przewijania
                border-radius: 4px;
            }

            li {
                flex: 0 0 auto; // Zapobiega rozciąganiu elementów
                height: 170px;
                width: 150px;

                div {
                    background-color: rgba(255, 255, 255, 0.9); // Półprzezroczyste tło dla elementów
                    width: 100%;
                    height: 100%;
                    border: 0.5px solid #999;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;

                    &:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2); // Zwiększenie cienia podczas hover
                    }

                    img {
                        width: 100%;
                        max-height: 80px;
                        object-fit: contain;
                        border-radius: 6px;
                    }

                    h2 {
                        font-size: 14px;
                        font-weight: 600;
                        margin: 4px 0 2px 0;
                        text-align: center;
                        color: #333;
                    }

                    p {
                        font-size: 13px;
                        font-weight: 500;
                        color: black;
                        margin: 0;
                        font-weight: bold;
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