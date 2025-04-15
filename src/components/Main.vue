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

    <div class="dolnyNav">
        <div class="dolnyNav__element">
            <p>Wszystkie leki</p>
        </div>
        <div class="dolnyNav__element">
            <p>Ulubione</p>
        </div>
        <div class="dolnyNav__element">
            <p>O mnie</p>
        </div>
    </div>

</template>
