import { request } from './request'
import Qs from 'qs'

export function getCateList(type, pagenum, pagesize) {
    return request({
        url: '/categories',
        method: 'get',
        params: {
            type,
            pagenum,
            pagesize
        }
    })
}
export function getCateGories(id, sel) {
    return request({
        url: `/categories/${id}/attributes`,
        params: {
            sel
        }
    })
}
export function postcategories(id, attr_name, attr_sel, attr_vals) {
    console.log(attr_name);
    return request({
        url: `/categories/${id}/attributes`,
        method: 'post',

        transformRequest: [function(data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data)
        }],

        data: {
            attr_name,
            attr_sel,
            attr_vals
        },

    })
}
export function putCateGories(id, attrid, attr_name, attr_sel, attr_vals) {
    return request({
        url: `/categories/${id}/attributes/${attrid}`,
        method: 'put',
        transformRequest: [function(data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data)
        }],
        data: {
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}