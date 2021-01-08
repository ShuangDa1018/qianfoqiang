import axios from "./axios";
let instance = axios({
    withCredentials: true,
    /** 跨域请求时是否需要使用凭证 */
    base: "",
    /** 请求基础路径 */
});

let request = {
    get(url, params, headers) {
        let options = {};
        if (!params) {
            params = {};
        }
        if (params) {
            options.params = params;
        }
        if (headers) {
            options.headers = headers;
        } else {
            options.headers = {};
        }
        return instance.get(url, options);
    },
    post(url, query, headers) {
        let options = {};
        if (headers) {
            options.headers = headers;
        } else {
            options.headers = {};
        }
        return instance.post(url, query, options);
    },
    delete(url, params, headers) {
        let options = {};
        if (!params) {
            params = {};
        }
        if (params) {
            options.params = params;
        }
        if (headers) {
            options.headers = headers;
        } else {
            options.headers = {};
        }
        return instance.delete(url, options);
    },
}
export default request;