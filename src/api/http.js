import axios from 'axios' // 引入axios
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据

import {
  Message
} from 'element-ui'

const baseApi = process.env.BASE_API

const axiosInstance = axios.create({
  baseURL: baseApi,
  timeout: 10000,
  withCredentials: false
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200 && response.data.code === 200) {
      return Promise.resolve(response)
    } else {
      Message.error(response.data.msg)
      return Promise.reject(response)
    }

  },
  // 服务器状态码不是2开头的的情况
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          Message({
            message: '请求404了,请检查网络或稍后再试!',
            type: 'error'
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.statusText,
            type: 'error'
          })
          break
      }
      return Promise.reject(error.response)
    } else {
      Message({
        message: '请求失败，请检查网络或稍后再试!',
        type: 'error'
      })
      return Promise.reject(error)
    }
  }
)


export function getBaseApi() {
  return baseApi
}


export function http(type, url, params) {
  const httpType = type ? type : 'get'
  if (httpType === 'get') {
    return get(url, params)
  } else {
    return post(url, params)
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return axiosInstance.get(url, {params: params})
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return axiosInstance.post(url, QS.stringify(params))
}

/**
 * @desc 上传文件
 * @param url
 * @param file
 */
export function uploadFile(url, file) {
  let formdata = new FormData()
  formdata.append('upfile', file)
  return axiosInstance.post(url, formdata)
}
