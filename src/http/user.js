import request from '../utils/request'

export function UserLevel() {
    return request({
        url: '/api/userlevel/lists',
        method: 'get',
    })
}

export function Upgrade(id) {
    return request({
        url: '/api/userlevel/upgrade',
        method: 'post',
        params: {
            user_level_id: id
        }
    })
}
