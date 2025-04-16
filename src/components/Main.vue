<script setup>
    import {ref, onMounted} from 'vue'

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
        console.log(data.value);

      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
        fetchData()
    })
    
</script>

<template>

    <div class="main">

        <div class="header">
            <h1>Witaj w aplikacji</h1>
            <button><i class="fa-solid fa-cart-shopping"></i></button>
        </div>

        <div class="container">
            <ul>
                <li v-for="item in data">

                    <img src="../assets/lek.jpeg" alt=" zdjęcie"/>

                        <div class="info">
                            <p>{{ item.name }}</p>
                            <p class="cena">{{ item.price }}zł</p>
                        </div>

                        <label for="ilosc" class="ilosc"> Ilość:
                          <select name="ilosc" id="ilosc" aria-placeholder="Ilość" aria-label="Ilość">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </label>
                        

                    <button>Dodaj</button>   
                </li>
            </ul>
        </div>

    </div>

</template>


<style scoped lang="scss">

html{
  background-color: transparent;
}

$green: #00ffbf;
$light-gray: #f8f8f8;
$shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$black: #000;
$gray: #666;



* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  
}

.main {
  background-color: #a5a5a5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  background-color: $green;
  padding: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: $shadow;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button{
    background-color: transparent;
    border: none;
    height: 20px;
    width: 20px;
  }

  i::before{
    height: 40px;
    width: 40px;
  }

  i:active { /* sprawdzenie czy działa */
    border: 4px solid black;
    border-radius: 8px;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
      color: $black;
    }
  }

.container {
  padding: 12px;
  flex: 1;
  overflow-y: auto;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
      background-color: white;
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-shadow: $shadow;

      img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        margin-right: 12px;
        object-fit: cover;
        box-shadow: $shadow;
      }

      .info {
        display: flex;
        flex-direction: column;
        flex: 1; // zajmuje dostępną przestrzeń
        justify-content: center;

      p:first-of-type {
        font-size: 16px;
        font-weight: bold;
        color: $black;
        margin: 0;
        }

      .cena {
        font-size: 16px;
        font-weight: bold;
        color: $black;
        margin: 0;
      }
      
        button {
          margin-top: 8px;
          background-color: $green;
          color: $black;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          box-shadow: $shadow;
          width: fit-content;

          &:hover {
            background-color: darken($green, 10%);
          }

          &:active {
            background-color: lighten($green, 10%);
        }
      }

      label{
        display: flex;
        align-items: center;
        margin-right: 30px;
        color: #000;
        
        
        

        select{
          height: 40px;
          width: 100%;
          padding: 10px 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: white;
          color: #333;
          font-size: 16px;
        } 

      }
    }
  
  }
}


</style>