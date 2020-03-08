import request from '../utils/request';

export function qrCode() {
    return request({
        url: '/api/share/qrcode',
        method: 'get'
    })
}

export function shareSuccess() {
    return request({
        url: '/api/share/shareSuccess',
        method: 'post'
    })
}
