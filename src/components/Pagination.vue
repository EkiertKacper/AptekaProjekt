<template>
    <div class="pagination">
      <button @click="$emit('prev')" :disabled="currentPage === 0">&lt;</button>
      <span>Strona {{ currentPage + 1 }} z {{ totalPages }}</span>
      <button @click="$emit('next')" :disabled="currentPage >= totalPages - 1">&gt;</button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    margin: 24px 0 0 0;
  }
  button {
    background: #81b433;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 6px 16px;
    font-size: 1.1rem;
    cursor: pointer;
  }
  button:disabled {
    background: #c7e2a3;
    cursor: not-allowed;
  }
  span {
    font-size: 1.1rem;
    color: #333;
  }
  </style>