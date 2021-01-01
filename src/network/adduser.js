import { request } from './request'

// 添加用户后台程序有问题 无法添加
export function addUsers(username, password, email, mobile) {
    return request({
        url: '/users',
        method: 'post',
        params: {
            username,
            password,
            email,
            mobile
        }
    })
}