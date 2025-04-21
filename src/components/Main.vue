
<script setup>
import Nav from '../components/userView/NavPc.vue'
import SearchBar from '../components/userView/SearchBarPc.vue'
</script>

<template>
    <div class="container">
        <Nav />
        <SearchBar/>
        <div class="kon">
            <div class="test"></div>
        </div>
            
          
    </div>
    </template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.container{
    display: flex;
    
    .kon{
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        .test{
            
            width: 300px;
            height: 300px;
            background-color: #333;
        }
    }

}

</style>
