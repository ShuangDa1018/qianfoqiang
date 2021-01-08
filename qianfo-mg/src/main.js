import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import Qs from 'qs'
import {
    messages
} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/element-#CD8020/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import request from './utils/request';
import './style/zc.css';
import {
    Message
} from 'element-ui';
import DeleteButton from './components/view/DeleteButton';
import './router/permission';
import global from './api/global_func.js';
import filter from "./api/filter.js"
import filters from "./api/filters.js"
import echarts from "./api/echarts.js"
// import tim from "./api/tim.js"
// import TIM from "tim-js-sdk"
import store from './store/index';
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
// Vue.prototype.$tim = tim;
// Vue.prototype.$TIM = TIM;
Vue.prototype.$qs = Qs; //全局加载
Vue.prototype.$axios = request;
Vue.prototype.$func = global;
Vue.prototype.$filter = filter;
Vue.prototype.$echarts = echarts
Vue.prototype.$store = store;
Vue.use(VueI18n);
Vue.use(DeleteButton);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

for (let k in filters) {
    Vue.filter(k, filters[k])
}
Vue.prototype.toast = function (msg, type) {
    if (!msg) {
        return;
    }
    Message({
        type: type || 'error',
        message: msg
    });
};

Vue.prototype.selfLoading = function (object, loading) {
    Vue.set(object, 'loading', loading);
};

let loadingInstance;

Vue.prototype.startLoading = function () {
    loadingInstance = app.$loading({
        lock: true,
        text: '请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.8)'
    });
};
Vue.prototype.stopLoading = function () {
    loadingInstance && loadingInstance.close();
};

Vue.prototype.addProperty = function (object, name, value) {
    Vue.set(object, name, value);
};




let app = new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');