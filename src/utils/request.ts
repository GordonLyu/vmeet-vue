import { useUserInfoStore } from "@/stores/user";
import axios from "axios";
import { ElMessage } from "element-plus";

const baseURL = import.meta.env.VITE_BASE_API;

const request = axios.create({
    timeout: 3000,
    baseURL: baseURL,
    headers: {
        "Content-Type": 'application/json'
    }
})


// 响应拦截器
request.interceptors.response.use(res => {
    if (res.data.code == 401 && res.data.msg == '未提供有效的Token') {
        useUserInfoStore().user = undefined;
        useUserInfoStore().token = ''
        location.reload();
    }
    return res.data;
}, error => {
    ElMessage({
        type: 'error',
        message: '服务器出现异常'
    })
    return Promise.reject(error);
})

// 请求拦截器
request.interceptors.request.use(config => {
    config.headers['token'] = useUserInfoStore().token;
    return config;
}, error => {
    ElMessage({
        type: 'error',
        message: '请求出现异常'
    })
    return Promise.reject(error);
})




export default request;