import axios from 'axios'
import router from '../router'
import {showAlert} from "../components/AlertComponent";

axios.defaults.timeout = 10000;
axios.defaults.baseURL = "http://localhost:8000";

// 请求拦截器
axios.interceptors.request.use(
    config => {
        console.log(`axios request interceptor`);
        if(sessionStorage.getItem('token')) {
            // 将token值存于请求头的Authorization字段中
            config.headers.Authorization = sessionStorage.getItem('token');
            console.log(`Authorization: ${config.headers.Authorization}`);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
// 超时只在响应拦截器处理
axios.interceptors.response.use(
    response => {
        //token is expired or token not exist  ???
        if(response.status == 200) {

        }
        return Promise.resolve(response);
    },
    err => {
        if (err.response) {
            if (err.response.data) {
                const error_code = err.response.data.error_code;
                switch (error_code) {
                    case '400101':
                        err.message = '请求参数缺少';
                        break;
                    case '400102':
                        sessionStorage.removeItem('token');
                        router.replace('/').catch(() => {
                        });
                        err.message = '无权限';
                        break;
                    default:
                        //500
                        err.message = '其它异常';
                        router.back();
                        break;
                }
            }
        } else {
            err.message = '响应超时';
        }
        showAlert(err.message);
        // turn to then
        return Promise.resolve(err);
    }
);

export default axios