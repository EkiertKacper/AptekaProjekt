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
        </div>

        <div class="container">
            <ul>
                <li v-for="item in data">
                    <img src="../assets/lek.jpeg" alt=" zdjęcie"/>
                        <div class="info">
                            <p>{{ item.name }}</p>
                            <p>{{ item.price }}zł</p>
                        </div>
                    <button>Add</button>   
                </li>
            </ul>
        </div>

    </div>

</template>


<style scoped lang="scss">

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
  padding: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: $shadow;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: $black;
  }
}

.container {
  padding: 16px;
  flex: 1;
  overflow-y: auto;

  ul {
    list-style: none;
    padding: 0;

    li {
      background-color: white;
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 8px;
      height: 20vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: $shadow;

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 16px;
        width: 100vw;
      }

      img{
        width: 50%;
        height: 50%;
        margin-right: 16px;
        box-shadow: $shadow;
        color: $black;
      }

      p {
        margin: 0;

        &:first-of-type {
          font-size: 16px;
          font-weight: bold;
          color: $black;
        }

        &:last-of-type {
          font-size: 15px;
          font-weight: 500;
          font-weight: bold;
          color: $gray;
        }
      }
    }

    button {
      background-color: $green;
      color: $black;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      box-shadow: $shadow;

      &:hover {
        background-color: darken($green, 10%);
      }

      &:active {
        background-color: lighten($green, 10%);
        border-radius: 8px;
      }
    }

  }
}

</style>