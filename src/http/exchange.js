import request from '../utils/request'

/**
 * 获取所有银行
 * @returns {AxiosPromise}
 * @constructor
 */
export function Banks() {
    return request({
        url: '/api/exchange/banks',
        method: 'get'
    })
}

/**
 * 获取银行详情
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function bankDetail(id) {
    return request({
        url: '/api/exchange/bankDetail',
        method: 'get',
        params: {
            id
        }
    })
}

/**
 * 获取银行兑换物品详情
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function bankGoods(id) {
    return request({
        url: '/api/exchange/bankGoods',
        method: 'get',
        params: {
            id
        }
    })
}

/**
 * 提交兑换信息
 * @param params
 * @returns {AxiosPromise}
 * @constructor
 */
export function submitExchange(params) {
    const data = new FormData;
    for (var i in params){
        data.append(i,params[i])
    }
    return request({
        url: '/api/exchange/submitExchange',
        method: 'post',
        data
    })
}

/**
 * 兑换订单列表
 * @returns {AxiosPromise}
 * @constructor
 */
export function order() {
    return request({
        url: '/api/exchange/order',
        method: 'get'
    })
}
