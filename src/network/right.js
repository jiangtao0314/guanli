import { request } from './request'
import qs from 'qs'

export function getRights(type) {
    return request({
        url: `/rights/${type}`,
    })
}
export function getRoles() {
    return request({
        url: '/roles'
    })
}
export function removeRoles(userid, rightid) {
    return request({
        url: `/roles/${userid}/rights/${rightid}`,
        method: 'delete',
    })
}
export function saveRoles(roleid, rids) {
    return request({
        url: `/roles/${roleid}/rights`,
        method: 'post',
        transformRequest: [function(data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data)
        }],
        data: {
            rids
        }
    })
}