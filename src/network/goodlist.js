import { request } from './request';
export function getGoodList(query, pagenum, pagesize) {
    pagesize = 10;
    return request({
        url: 'goods',
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}
export function TableDeleteClick(id) {
    return request({
        url: `goods/${id}`,
        method: 'delete'
    })
}