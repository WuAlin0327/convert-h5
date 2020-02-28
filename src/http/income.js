import request from '../utils/request'
export function incomeList(params) {
    return request({
        url: '/api/income/lists',
        method: 'get',
        params
    })

}
