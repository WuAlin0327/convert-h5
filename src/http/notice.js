import request from '../utils/request';

export function NoticeList() {
    return request({
        url: '/api/notice/lists',
        method: 'get',
    })
}

export function NoticeDetail(id) {
    return request({
        url: '/api/notice/detail',
        method: 'get',
        params:{
            id
        }
    })
}
