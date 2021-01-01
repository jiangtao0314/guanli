import axios from 'axios'
import Qs from 'qs'
export function request(config) {
    const instance = axios.create({
            baseURL: 'http://127.0.0.1:8888/api/private/v1/',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        //请求拦截
    instance.interceptors.request.use((config) => {
        // console.log(config);
        // 请求时发送请求头
        config.headers.Authorization = window.sessionStorage.getItem('token')
            // console.log(config);
        return config
    })
    return instance(config)
}