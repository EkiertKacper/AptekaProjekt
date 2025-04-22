import { defineStore } from 'pinia'
import { defineComponent, markRaw, shallowRef } from 'vue'
import MainPage from '../components/MainPage.vue';
export const usePageChanger = defineStore('currentPage', {
  state: () => ({
    currentPage: markRaw(defineComponent(MainPage))
  }),
  actions: {
    changePage(page){
        this.currentPage = markRaw(page)
    }
  },
})