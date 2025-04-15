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
    <div class="listaLekow">
        
    </div>
</template>
