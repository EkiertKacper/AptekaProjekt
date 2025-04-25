import { defineStore } from 'pinia'
import { defineComponent, markRaw, shallowRef } from 'vue'
import MainPage from '../components/MainPage.vue';
export const usePageChanger = defineStore('currentPage', {
  state: () => ({
    currentPage: markRaw(defineComponent(MainPage)),
    currentProps: {}
  }),
  actions: {
    changePage(page, props = {}){
      this.currentPage = markRaw(page)
      this.currentProps = markRaw(props)
    }
  },
})