import { request } from './request'
export function userchange(uId, type) {
    return request({
        method: 'put',
        url: `users/${uId}/state/${type}`,
    })
}