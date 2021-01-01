import { request } from './request'
export function getOrders(query, pagenum, pagesize, user_id, pay_status, is_send,
    order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr) {
    pagesize = 20
        // console.log(pagenum);
    return request({
        url: '/orders',
        params: {
            query,
            pagenum,
            pagesize,
            user_id,
            pay_status,
            is_send,
            order_fapiao_title,
            order_fapiao_company,
            order_fapiao_content,
            consignee_addr
        }
    })
}

export function getkuaidi(id) {
    return request({
        url: `/kuaidi/${id}`
    })
}
export function getReports() {
    return request({
        url: '/reports/type/1'
    })
}