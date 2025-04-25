import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Toast from './components/Toast.vue';

const app = createApp(App)
app.component('Toast', Toast)
app.use(createPinia())
app.mount('#app')

