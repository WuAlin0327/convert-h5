import Vue from 'vue'
import Vant from 'vant'
import router from "./router";
import store from "./store";
import 'vant/lib/index.css';
import './assets/css/common.css';
import { __CDN__ } from '@/settings'
import 'amfe-flexible';
import './utils/rem';

Vue.use(Vant);
import App from './App.vue';
import {isBase64} from "./utils/common";

window.CHECK_URL = function(url){
  if (isBase64(url))return url;
  //url= 协议://(ftp的登录信息)[IP|域名](:端口号)(/或?请求参数)
  var strRegex = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;//请求参数结尾- 英文或数字和[]内的各种字符

  var strRegex1 = '^(?=^.{3,255}$)((http|https|ftp)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/)?(?:\/(.+)\/?$)?(\/\w+\.\w+)*([\?&]\w+=\w*|[\u4e00-\u9fa5]+)*$';
  var re=new RegExp(strRegex,'i');//i不区分大小写
  //将url做uri转码后再匹配，解除请求参数中的中文和空字符影响
  if (re.test(encodeURI(url))) {
    return url
  } else {
    return __CDN__ + url
  }
};
Vue.filter('CHECK_URL', window.CHECK_URL);
Vue.prototype.CHECK_URL = window.CHECK_URL;

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
