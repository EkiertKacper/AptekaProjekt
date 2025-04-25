  <script setup>
  import { ref } from 'vue';
  
  const activeToasts = ref([]);
  let id = 0;
  const showToast = (message, type, duration = 3000) => {
    const newToast = {
      message,
      type,
      id: id++,      
    };
    activeToasts.value.push(newToast);
    if(activeToasts.value.length>3){
        activeToasts.value.splice(0,1)
    }
      
    setTimeout(() => {
        activeToasts.value = activeToasts.value.filter(toast => toast.id !== newToast.id);
    }, duration);
  };
  
  defineExpose({
    showToast
  });
  </script>

<template>
    <div class="toast-container">
      <div
        v-for="toast in activeToasts"
        :key="toast.id"
        class="toast"
        :class="toast.type"
      >
        {{ toast.message }}
      </div>
    </div>
  </template>
  
  <style scoped>
  .toast-container {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9999;
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .toast {
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    opacity: 0;
    animation: slide-up 0.3s ease-out forwards, fade-out 0.3s ease-in 2.7s forwards;
    min-width: 200px;
    box-sizing: border-box;
  }
  .toast.positive{
    background-color: #81b433;
  }
  .toast.negative{
    background-color: red;
  }

  
  @keyframes slide-up {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  </style>