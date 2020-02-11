import Vue from 'vue'
import Vant from 'vant'
import router from "./router";
import store from "./store";
import 'vant/lib/index.css';
import './assets/css/common.css';
import 'amfe-flexible';
import './utils/rem';
Vue.use(Vant);
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
