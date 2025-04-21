import { defineStore } from 'pinia'
import { defineComponent, markRaw, shallowRef } from 'vue'
export const usePageChanger = defineStore('currentPage', {
  state: () => ({
    currentPage: defineComponent()
  }),
  actions: {
    changePage(page){
        this.currentPage = markRaw(page)
    }
  },
})