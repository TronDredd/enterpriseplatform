import axios from 'axios'

axios.defaults.timeout = 8000
axios.defaults.baseURL = "http://localhost:8000"

//请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//响应拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axios