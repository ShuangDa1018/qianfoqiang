import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/common.css"
import filter from "./utils/filter"
import axios from "./utils/request"
import {
  Toast,Dialog
} from 'vant';
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$filter = filter;
Toast.setDefaultOptions({
  duration: 1500,
  forbidClick: true
})
Vue.use(Toast)
Vue.use(Dialog)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
