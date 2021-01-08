import Vue from 'vue'
import Vuex from 'vuex'


import {
    Notification
} from "element-ui"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        current: Date.now(), // 当前时间
        intervalID: 0,
        message: "",
    },
    getters: {
        hidden(state) {
            // eslint-disable-next-line no-unused-vars
            //返回当前页面是否隐藏

            const temp = state.current
            if (typeof document.hasFocus !== 'function') {
                return document.hidden
            }
            return !document.hasFocus()
        }
    },
    mutations: {
        showMessage(state, options) {
            if (state.message) {
                state.message.close()
            }
            state.message = Notification({
                message: options.message,
                type: options.type,
                duration: options.duration || 1500,
                offset: 100
            })
        }
    },
    modules: {

    }
});