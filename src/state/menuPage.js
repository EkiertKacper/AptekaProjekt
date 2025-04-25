import { defineStore } from 'pinia'
import { defineComponent, markRaw } from 'vue'
import Cart from '../components/Cart.vue'
export const useMenuPage = defineStore('currentMenuPage', {
  state: () => ({
    currentMenuPage: markRaw(defineComponent(Cart))
  }),
  actions: {
    changePage(page){
        this.currentMenuPage = markRaw(page)
    }
  },
})