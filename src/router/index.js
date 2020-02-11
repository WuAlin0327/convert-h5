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
            component: () => import('../views/Index'),
            meta: {
                isAuth: false,
                showFooter: true,
            }
        },
        {
            path:'/upgrade',
            name: 'upgrade',
            component: () => import('../views/Upgrade'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('../views/account/User'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path:'/login',
            name:'login',
            component: () => import('../views/account/Login'),
            meta: {
                isAuth: false,
                showFooter: false,
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/account/Register'),
            meta: {
                isAuth: false,
                showFooter: false
            }
        },
        {
            path: '/account/forget',
            name: 'forget',
            component: () => import('../views/account/ForgetPassword'),
            meta: {
                isAuth: false,
                showFooter: false
            }
        },
        {
            path: '/bank/:id',
            name: 'bank',
            component: () => import('../views/BankDetail'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/active/:name',
            name: 'active',
            component: () => import('../views/Active'),
            meta: {
                isAuth: false,
                showFooter: false
            }
        },
        {
            path: '/noticeList',
            name: 'noticeList',
            component: () => import('../views/NoticeList'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/signin',
            name: 'signin',
            component: () => import('../views/account/Signin'),
            meta: {
                isAuth: true,
                showFooter: true
            }
        },
        {
            path: '/share',
            name: 'share',
            component: () => import('../views/Share'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/exchange',
            name: 'exchange',
            component: () => import('../views/exchange/Exchange'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/exchange/list',
            name: 'exchangeList',
            component: () => import('../views/exchange/ExchangeList'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        },
        {
            path: '/exchange/goods/:id',
            name: 'exchangeGoods',
            component: () => import('../views/exchange/ExchangeGoods'),
            meta: {
                isAuth: false,
                showFooter: true
            }
        }
    ]
});

// 全局前置守卫
router.beforeEach((to,from,next) => {
    // 如果需要前往的路由需要登录，则跳转到登录页面
    if (to.meta.isAuth && typeof store.getters.token == 'undefined'){
        next('/login')
    }
    next();
});


export default router
