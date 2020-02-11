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
