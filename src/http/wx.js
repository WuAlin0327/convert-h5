import request from '../utils/request'
import {__WX__} from '@/settings'
export function wxConfig(url) {
    return request({
        url: __WX__,
        method: 'get',
        params:{
            url: window.location.href.split('#')[0]
        }
    })
}

export function wxUserInfo(code) {
    return request({
        url: 'http://h5.convert.ceanro.cn/wx/wxuserinfo.php',
        method: 'get',
        params: {
            code
        }
    })
}
