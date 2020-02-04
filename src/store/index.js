import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        token:''
    },
    mutations: {
        setToken (state,token) {
            state.token = token;
        }
    },
    getters: {
        token: ()=>{
            return window.localStorage.getItem('token') | ''
        }
    },
});

export default store
