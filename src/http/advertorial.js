import request from '../utils/request'

/**
 * 软文分类
 * @returns {AxiosPromise}
 */
export function category() {
    return request({
        url: '/api/advertorial/category',
        method: 'get'
    })
}

export function article(category_id) {
    return request({
        url: '/api/advertorial/article',
        method: 'get',
        params: {
            category_id
        }
    })
}
