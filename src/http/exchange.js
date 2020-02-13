import request from '../utils/request'

export function Banks() {
    return request({
        url: '/api/exchange/banks',
        method: 'get'
    })
}

export function bankDetail(id) {
    return request({
        url: '/api/exchange/bankDetail',
        method: 'get',
        params: {
            id
        }
    })
}

export function bankGoods(id) {
    return request({
        url: '/api/exchange/bankGoods',
        method: 'get',
        params: {
            id
        }
    })
}
