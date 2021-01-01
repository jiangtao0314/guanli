import { request } from './request'

export function sendlogin(type, username, password) {
    return request({
        url: '/login',
        params: {
            type,
            username,
            password
        }
    })
}