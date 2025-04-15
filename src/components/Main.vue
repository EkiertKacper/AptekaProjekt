<script setup>
    const fetchData = async () => {
        try{
            const data = await fetch("https://localhost:3030/routes/drugs/listDrugs.js")
            console.log("chyba dzial;a");
        } catch (error){
            console.log(error);
        }
    }
    fetchData()
</script>
<template>
    <p>tu bedzie wszystko</p>
    <p>okok</p>
    <p>comicik</p>
    <p>drugi comicik</p>
</template>
