import Cookies from 'js-cookie'
const state = {
    footer_name: Cookies.get('footer-name') || 'home',
};

const mutations = {
    SET_FOOTER_NAME : (state,name) => {
        state.footer_name = name;
        Cookies.set('footer-name',name)
    }
};

const actions = {
    footerName : ({commit},name) => {
       commit('SET_FOOTER_NAME',name)
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
