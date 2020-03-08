import { getToken,setToken, removeToken } from '@/utils/token'
import { loginApi } from "../../http";

const state = {
  token: getToken(),
  userInfo: {},
  bank: {
    id: '',
    bankname: ''
  }
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    setToken(token)
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_BANK: (state,{id,name}) => {
    state.bank.id = id;
    state.bank.bankname = name;
  }
};

const actions = {
  // user login
  login(store, userInfo) {
    const { username, password } = userInfo;
    // 调用登录API
    return loginApi(username,password)
  },

  bank(store,obj){
    store.commit('SET_BANK',obj)
  },

  // remove token
  resetToken({ commit }) {
    commit('SET_TOKEN', '');
    removeToken();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
