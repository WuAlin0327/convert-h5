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

/**
 * 提现申请
 */
export function withdraw(forms) {
    const data = new FormData();
    for (const key in forms){
        data.append(key,forms[key])
    }
    return request({
        url:'/api/user/withdraw',
        method: 'post',
        data
    })
}

/**
 * 注册
 * @param form
 * @returns {AxiosPromise}
 * @constructor
 */
export function Register(form) {
    const data = new FormData();
    for (const key in form){
        data.append(key,form[key])
    }
    return request({
        url: '/api/user/register',
        method: 'post',
        data
    })
}

export function resetPwd(form) {
    const data = new FormData();
    for (const key in form){
        data.append(key,form[key])
    }
    return request({
        url: '/api/user/resetpwd',
        method: 'post',
        data
    })
}

export function sendSms(mobile,event) {
    return request({
        url: '/api/sms/send',
        method:'post',
        params: {
            mobile,
            event
        }
    })
}

export function Team(sort) {
    return request({
        url: '/api/user/team',
        method: 'get',
        params: {
            sort
        }
    })

}

export function userDetail(uid) {
    return request({
        url: '/api/user/detail',
        method: 'get',
        params: {
            uid
        }
    })

}

export function cash() {
    return request({
        url: '/api/user/cash',
        method: 'get'
    })
}

export function certification(forms) {
    const data = new FormData;
    for (let i in forms){
        data.append(i,forms[i])
    }
    return request({
        url: '/api/user/certification',
        method:'post',
        data
    })

}

/**
 * 签到数据
 * @returns {AxiosPromise}
 */
export function signIn() {
    return request({
        url: '/api/user/signin',
        method: 'get'
    })

}

export function submitSignIn() {
    return request({
        url: '/api/user/submitSignin',
        method: 'post'
    })
}

export function changeMobile(data) {
    return request({
        url: '/api/user/changemobile',
        method: 'post',
        data
    })

}

export  function userProfile(data) {
    return request({
        url: '/api/user/profile',
        method: 'post',
        data
    })
}

export function mobileLogin(data) {
    return request({
        url: '/api/user/mobilelogin',
        method: 'post',
        data
    })
}

export function checkOpenid(data) {
    return request({
        url: '/api/user/checkOpenid',
        method: 'post',
        data
    })
}
