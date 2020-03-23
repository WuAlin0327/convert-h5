import request from '../utils/request'

/**
 * 配置列表
 * @param params
 * @returns {AxiosPromise}
 * @constructor
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

/**
 * 登录
 * @param account
 * @param password
 * @returns {AxiosPromise}
 * @constructor
 */
export function loginApi(account,password) {
    const data = new FormData;
    data.append('account',account);
    data.append('password',password);
    return request({
        url: '/api/user/login',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * Banner图
 * @returns {AxiosPromise}
 * @constructor
 */
export function Banner() {
    return request({
        url: '/api/banner/lists',
        methos: 'get',
    })
}

/**
 * 首页菜单
 * @returns {AxiosPromise}
 * @constructor
 */
export function indexMenu() {
    return request({
        url: '/api/index/menu',
        methods: 'get'
    })
}

// export function uploadImage(file) {
//     return request({
//         url: '/api/common/upload',
//         method: 'post',
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         },
//         data: {
//             file
//         }
//     })
//
// }
/**
 * 图片上传
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
export const uploadImage = data => request({ url: '/api/common/upload', method: 'post', headers: { 'Content-Type': 'multipart/form-data' }, data });

/**
 * 专属客服
 * @returns {AxiosPromise}
 * @constructor
 */
export function Service() {
    return request({
        url: '/api/exclusive/service',
        method: 'get'
    })
}

export function BannerDetail(id) {
    return request({
        url: '/api/banner/detail',
        method: 'get',
        params:{
            id
        }
    })
}

export function incomeLog() {
    return request({
        url: '/api/index/income',
        method: 'get',

    })
}
