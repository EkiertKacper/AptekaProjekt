<script setup>
import { ref } from 'vue';

const res = ref('')
const res2 = ref('')
const handleSearch = async () => {
  const token = localStorage.getItem("sessionToken");

  const requestBody = {
    page: 0,
    limit: 999,
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
    res.value = data.data
    console.log(res.value);
    if(data.data == ''){
        console.log('load');
        return
    }
    return data.data; 
  } catch (error) {
    console.error("Wystąpił błąd podczas wysyłania żądania:", error);
    return null;
  }
};
handleSearch()
</script>

<template>
    <h1 style="margin: 0 13vw ;">To jest nie wazne jak cos</h1>
    <div style="margin-left: 13vw;" v-for="item in res" :key="item.id">
        <img style="width: 100px;" :src="item.image" alt="dupa">
    </div>
</template>