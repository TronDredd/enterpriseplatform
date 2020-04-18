import axios from 'axios'
import router from '../router'

axios.defaults.timeout = 8000;
axios.defaults.baseURL = "http://localhost:8000";

//请求拦截器
axios.interceptors.request.use(
    config => {
        console.log(`axios request interceptor`);
        if(sessionStorage.getItem('token')) {
            config.headers.Authorization = sessionStorage.getItem('token');
            console.log(`Authorization: ${config.headers.Authorization}`);
        }
        return config;
    },
    error => {
        console.log(`sessionStorage中没有token`);
        return Promise.reject(error);
    }
);

//响应拦截器o
axios.interceptors.response.use(
    response => {
        // console.log(`axios response interceptor`);
        // if(response.data.error_code && response.data.error_code == '400102') {
        //     sessionStorage.removeItem('token');
        //     localStorage.removeItem('token');
        //     console.log(`token失效`);
        //     window.alert(response.data.error_message);
        // }
        return response;
    },
    error => {
        const error_code = error.response.data.error_code;
        if(error_code && error_code == '400102') { //user token is not authorized
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            router.replace('/account').catch(() => {});
            window.alert(`error: ${error.response.data.error}`)
        }
        return Promise.reject(error);
    }
);

export default axios