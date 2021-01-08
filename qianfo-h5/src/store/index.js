import Vue from 'vue'
import Vuex from 'vuex'
import preview from './modules/preview'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    previewList: [], //图片预览
  },
  mutations: {},
  actions: {},
  modules: {
    preview
  }
})