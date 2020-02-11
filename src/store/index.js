// import Vuex from 'vuex'
// import Vue from "vue";
// import Cookies from 'js-cookie';
// Vue.use(Vuex);
// const store = new Vuex.Store({
//     state: {
//         token: '',
//         userInfo: {}
//     },
//     mutations: {
//         SET_TOKEN (state,token) {
//             state.token = token;
//             Cookies.set('token',token)
//         },
//         SET_USER_INFO(state,userInfo){
//             state.userInfo = userInfo;
//             Cookies.set('userInfo',userInfo)
//         }
//     },
//     getters: {
//         token: () => {
//             try {
//                 return Cookies.get('token')
//             }catch (e) {
//                 return null;
//             }
//         },
//         userInfo: () => {
//             try {
//                 return JSON.parse(Cookies.get('userInfo'))
//             }catch (e) {
//                 return {}
//             }
//
//
//         },
//     },
//     actions: {
//         tokenDispatch: (context,token) => {
//                 context.commit('setToken',token)
//         },
//         userInfoDispatch: (context,userInfo) => {
//             context.commit('setUserInfo',userInfo)
//         }
//     }
// });
//
// export default store
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {});

const store = new Vuex.Store({
    modules,
    getters
});

export default store
