import request from '../utils/request'

/**
 * 用户等级列表
 * @returns {AxiosPromise}
 * @constructor
 */
export function UserLevel() {
    return request({
        url: '/api/userlevel/lists',
        method: 'get',
    })
}

/**
 * 用户升级
 * @param id
 * @returns {AxiosPromise}
 * @constructor
 */
export function Upgrade(id) {
    const data = new FormData;
    data.append('user_level_id',id);
    return request({
        url: '/api/userlevel/upgrade',
        method: 'post',
        data: data
    })
}

/**
 * 用户信息
 * @returns {AxiosPromise}
 * @constructor
 */
export function UserInfo() {
    return request({
        url: '/api/user/userInfo',
        method: 'get'
    })
}

/**
 * 注销登录
 * @returns {AxiosPromise}
 * @constructor
 */
export function LogoutApi() {
    return request({
        url: '/api/user/logout',
        method: 'get'
    })
}

/**
 * 用户的银行卡
 * @returns {AxiosPromise}
 */
export function userBankList() {
    return request({
        url: '/api/user/userBankList',
        method: 'get'
    })
}

export function addUserBank(data) {
    return request({
        url: '/api/user/addUserBank',
        method: 'post',
        data
    })
}

export function removeUserBank(id) {
    const data = new FormData;
    data.append('id',id);
    return request({
        url: '/api/user/removeUserBank',
        method: 'post',
        data
    })
}

/**
 * 提现银行卡列表
 * @returns {AxiosPromise}
 */
export function withdrawBank() {
     return request({
         url: '/api/withdrawbank/lists',
         method: 'get'
     })
}
