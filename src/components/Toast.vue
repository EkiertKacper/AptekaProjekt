<script setup>
import { ref } from "vue";
const visible = ref(false);
const message = ref("");
const toastType = ref("success");

function showToast(msg = "Powiadomienie", type = "success") {
  message.value = msg;
  toastType.value = type;
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 2000);
}

defineExpose({ showToast });
</script>



<template>
  <transition name="fade">
    <div v-if="visible" :class="['toast', toastType]">
      {{ message }}
    </div>
  </transition>
</template>



<style scoped>
.toast {
  position: fixed;
  right: 32px;
  bottom: 32px;
  color: #fff;
  padding: 18px 24px;
  border-radius: 12px;
  font-size: 1.1rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
  z-index: 10000;
  opacity: 0.95;
  border: 2px solid #386641;
  background: rgba(129, 180, 51, 0.85);
}
.toast.error {
  background: rgba(200, 50, 50, 0.92);
  border-color: #a10000;
}
.toast.success {
  background: rgba(129, 180, 51, 0.85);
  border-color: #386641;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>