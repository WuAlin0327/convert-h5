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
    return request({
        url: '/api/userlevel/upgrade',
        method: 'post',
        params: {
            user_level_id: id
        }
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
