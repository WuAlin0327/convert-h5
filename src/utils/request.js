import axios from 'axios'
import store from '@/store'
import { __API__ } from '@/settings'
// create an axios instance
const service = axios.create({
  baseURL: __API__, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

      // eslint-disable-next-line no-console
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 响应码校验暂时取消，直接返回响应内容
      // eslint-disable-next-line no-console
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
);

export default service
