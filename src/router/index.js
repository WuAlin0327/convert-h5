/* eslint-disable no-console */
import VueRouter from "vue-router";
import store from '../store'
import Vue from "vue";
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Index'),
            meta: {
                isAuth: false,
                showFooter: true,
            }
        },
        {
            path:'/upgrade',
            name: 'upgrade',
            component: () => import('@/views/Upgrade'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/account/User'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/settings',
            name: 'userSettings',
            component: () => import('@/views/account/user/Settings'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/settings/bank',
            name: 'userBank',
            component: () => import('@/views/account/user/settings/Bank'),
            meta: {
                isAuth: true,
                showFooter: false
            }
        },
        {
            path: '/user/settings/addbank',
            name: 'userAddBank',
            component: () => import('@/views/account/user/settings/AddBank'),
            meta: {
                isAuth: true,
                showFooter: false
            }
        },
        {
            path: '/user/settings/changeMobile',
            name: 'changeMobile',
            component: () => import('@/views/account/user/settings/ChangeMobile'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/aboutus',
            name: 'userAboutus',
            component: () => import('@/views/account/user/Aboutus'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/user/setUserInfo',
            name: 'setUserInfo',
            component: () => import('@/views/account/user/setUserInfo'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/team',
            name:'userTeam',
            component: () => import('../views/account/user/Team'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/income',
            name:'userIncome',
            component: () => import('../views/account/user/Income'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/profit',
            name:'userProfit',
            component: () => import('../views/account/user/Profit'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/cash',
            name:'userCash',
            component: () => import('../views/account/user/Cash'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/detail/:id',
            name: 'userDetail',
            component: () => import('../views/account/user/Detail'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/user/certification',
            name: 'certification',
            component: () => import('../views/account/user/Certification'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path:'/login',
            name:'login',
            component: () => import('@/views/account/Login'),
            meta: {
                isAuth: false,
                showFooter: false,
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/account/Register'),
            meta: {
                isAuth: false,
                showFooter: false
            }
        },
        {
            path: '/account/forget',
            name: 'forget',
            component: () => import('@/views/account/ForgetPassword'),
            meta: {
                isAuth: false,
                showFooter: false
            }
        },
        {
            path: '/bank/:id',
            name: 'bank',
            component: () => import('@/views/BankDetail'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/article/:name',
            name: 'article',
            component: () => import('@/views/Article'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/noticeList',
            name: 'noticeList',
            component: () => import('@/views/notice/NoticeList'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/noticeDetail/:id',
            name: 'noticeDetail',
            component: () => import('@/views/notice/NoticeDetail'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/signin',
            name: 'signin',
            component: () => import('@/views/account/Signin'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/share',
            name: 'share',
            component: () => import('@/views/share/Share'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/share/qrcode',
            name: 'shareQrcode',        // 二维码分享
            component: () => import('../views/share/Qrcode'),
            meta: {
                isAuth: true,
                showFooter: false
            }
        },
        {
            path: '/share/spread',
            name: 'shareSpread', // 软文分享
            component: () => import('../views/share/Spread'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/share/push',
            name: 'sharePush',      //地推
            component: () => import('../views/share/Push'),
            meta: {
                isAuth: false,
                showFooter: false
            }
        },
        {
            path: '/exchange',
            name: 'exchange',
            component: () => import('@/views/exchange/Exchange'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/exchange/list',
            name: 'exchangeList',
            component: () => import('@/views/exchange/ExchangeList'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/exchange/goods/:id',
            name: 'exchangeGoods',
            component: () => import('@/views/exchange/ExchangeGoods'),
            meta: {
                isAuth: false,
                showFooter: false
            }
        },
        {
            path: '/exchange/submit/images/:goodsId',
            name: 'submitImages',
            component: () => import('@/views/exchange/submit/Images'),
            meta: {
                isAuth: true,
                showFooter: false
            }
        },
        {
            path: '/exchange/submit/sms/:goodsId',
            name: 'submitSms',
            component: () => import('@/views/exchange/submit/Sms'),
            meta: {
                isAuth: true,
                showFooter: false
            }
        },
        {
            path: '/exchange/submit/integral/:goodsId',
            name: 'submitIntegral',
            component: () => import('@/views/exchange/submit/Integral'),
            meta: {
                isAuth: true,
                showFooter: false
            }
        },
        {
            path: '/exchange/order',
            name: 'order',
            component: () => import('@/views/exchange/Order'),
            meta: {
                isAuth: true,
                showFooter: true,
            }
        },
        {
            path: '/banner/:id',
            name: 'banner',
            component: () => import('@/views/BannerDetail'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/wxbind',
            name: 'wxbind',
            component: () => import('../views/account/Wxbind'),
            meta: {
                isAuth: false,
                showFooter: false
            }
        },
        {
            name:'404',
            path:'/404.html',
            component: () => import('../views/NotFound'),
        },
        {
            path: '*',
            redirect: {
                name: "404"
            }
        }
    ]
});

// 全局前置守卫
router.beforeEach((to,from,next) => {
    // 如果需要前往的路由需要登录，则跳转到登录页面
    if (to.meta.isAuth && typeof store.getters.token == 'undefined'){

        // //保存当前路由地址，授权后还会跳到此地址
        // sessionStorage.setItem('wxRedirectUrl', to.fullPath)
        // //请求微信授权,并跳转到 /WxAuth 路由
        // let appId = 'wx2f235ac3ab6e8324';
        // let redirectUrl = encodeURIComponent('http://h5.convert.ceanro.cn/wxbind');
        // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        next('/login')
    }
    if (to.path !==  location.pathname && (to.name === 'shareSpread' || to.name === 'user')) {
        location.assign(to.fullPath) // 此处不可使用location.replace
    } else {
        next()
    }
});


export default router
