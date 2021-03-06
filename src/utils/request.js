import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { deepClone } from '.'
import {eventBus} from './eventBus'
// appConfig是全局变量
const baseIp = appConfig.baseIp
// create an axios instance
const service = axios.create({
        // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
        baseURL: baseIp,
        // withCredentials: true, // send cookies when cross-domain requests
        timeout: 5000 // request timeout
    })
    // request interceptor
service.interceptors.request.use(
    config => {
        // console.log(config);
        if (config.data && Boolean(config.data.ProjectNo) && !(config.data.ProjectNo > 0)) {
            eventBus.$emit('selectStage')
            return
        }
        // do something before request is sent
        config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json;charset=utf-8';
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['token'] = store.getters.token
                // console.log(config);
            if (config.method === 'get') {
                config.params = config.data
            }
            if (config.method === 'post' && config.data) {
                let dataObj = deepClone(config.data)
                let dataArr = []
                for (let key in dataObj) {
                    dataArr.push({ name: key, value: dataObj[key] })
                }
                config.data = dataArr
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
        const res = response.data
        if (response.status !== 200) {
            //  202: Token expired;

        } else {
            if (!res.bResult) {
                Message({
                    message: res.strMessage || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(new Error('bResult is false!'))
            }
            if (response.headers.token) {
                store.commit('user/SET_TOKEN', response.headers.token)
            }
            if (response.config.data && response.config.data.includes('CurrentPage')) {
                return Promise.resolve({ list: res.ObjectList, total: res.allResultCounts })
            } else {
                return Promise.resolve(res.ObjectList)
            }

        }
    },
    error => {
        const response = error.response
        console.log(error);
        if (response.status === 401) {
            if (/login/i.test(response.request.requestURL)) {
                return Promise.reject(new Error('Login Error'))
            }
            // to re-login
            MessageBox.confirm('身份信息已失效，请重新登录', '提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '算了',
                type: 'warning',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false
            }).then(res => {
                store.commit('user/SET_TOKEN', '')
                location.reload()
            })
        } else if (response.status === 500) {
            Message({
                message: '服务器错误',
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            Message({
                message: '网络超时',
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(new Error(`${response.statusText}(${response.status})` || 'Error'))
    }
)

export default service