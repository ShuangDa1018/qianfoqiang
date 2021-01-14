import axios from "axios";
let http = axios.create({
    timeout: 30000,
});

http.defaults.headers.post["Content-Type"] = "application/json";
http.interceptors.request.use(
    (config) => {
        try {
            /** 这里可以添加一些通用的请求参数，例如：token */
            config.headers['webToken'] = JSON.parse(sessionStorage.getItem('qianfoqiang_loginMessage')).token
            // config.headers['weChatId'] = JSON.parse(sessionStorage.getItem('loginMessage')).weChatId
        } catch (e) {}

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
http.interceptors.response.use((response) => {
    let {
        data,
        code,
        msg
    } = response.data;
    if (code == 200 || code == 204 || code == 1) {
        /** 接口调用成功返回数据与提示消息 */
        return Promise.resolve({
            data: data,
            msg: msg,
        });
    } else if (code == 401) {
        /** 一般来说401状态表示需要登录 */
        return Promise.reject(msg);
    } else {
        return Promise.reject(msg);
    }
});
export default function () {
    return http;
}