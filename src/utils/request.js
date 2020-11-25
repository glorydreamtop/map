import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
      // console.log(config);
      if (config.method === 'get') {
        config.params = config.data
      }
      // if (['get', 'put', 'delete'].includes(config.method) && config.data && config.data.id) {
      //   config.url = `${config.url}/${config.data.id}`
      //   delete config.data.id
      // }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
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
    console.log(response);
    const res = response.data
    if (res.bResult !== true) {
      //  202: Token expired;
      if (res.code === 202) {
        // to re-login
        MessageBox.confirm('身份信息已失效，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '算了',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (res.code === 201) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '网络超时',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
