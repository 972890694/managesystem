import axios from 'axios'
import Vue from 'vue'
import router from '../router/router'

export const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})

http.login = ({ username, password }) => {
    return http.post(`login`, {
        username,
        password,
    })
}
// 封装 get 请求
http.$get = (path, options) => {
    return http.get(path, {
        params: options,
        // headers: { Authorization: sessionStorage.getItem("token") }
    })
}
// 封装 post 请求
http.$post = (path, options) => {
    return http.post(path, options)
}

// 设置请求拦截
http.interceptors.request.use(function (config) {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 设置响应拦截
http.interceptors.response.use(function (response) {
    if (response.data.meta.status == 400 && response.data.meta.msg == "无效token") {
        Vue.prototype.$message.warning('请先登录')
        router.push('/login')
    }
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});