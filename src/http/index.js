import request from '../utils/request'

/**
 * 配置列表
 * @param params
 * @returns {AxiosPromise}
 */
export function configApi(params = '*'){
    return request({
        url:'/api/common/config',
        method:'get',
        params:{
            params
        }
    })
}

export function loginApi(account,password) {
    return request({
        url: '/api/user/login',
        method: 'post',
        params: {
            account,
            password
        }
    })
}

export function Banner() {
    return request({
        url: '/api/banner/lists',
        methos: 'get',
    })
}

export function indexMenu() {
    return request({
        url: '/api/index/menu',
        methods: 'get'
    })
}
