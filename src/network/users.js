import { request } from './request'
export function getUserList(query, pagenum, pagesize) {
    return request({
        url: '/users',
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}

export function UserEdit(id, email, mobile) {
    // console.log(123);
    // console.log(email);
    // console.log(mobile);
    return request({
        url: `/users/${id}`,
        method: 'put',
        params: {
            email: email,
            mobile: mobile
        }
    })
}
export function removeUserById(id) {
    return request({
        url: `/users/${id}`,
        method: 'delete',
    })
}