import { request } from './request';
export function getmenus() {
    return request({
        url: '/menus',
        method: 'get',
    })
}