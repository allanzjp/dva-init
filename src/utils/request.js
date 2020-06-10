import {routerRedux} from 'dva/router'
import {Modal, Toast} from 'antd-mobile';
import {getToken, removeToken} from './cookies';
import axios from 'axios'
import store from '../index'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 设置全局参数，如响应超市时间，请求前缀等。
axios.defaults.timeout = 5000
axios.defaults.baseURL = '/';
// axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {

  if (config.method === 'get' && typeof config.url !== 'undefined') {
    if (typeof config.params === 'undefined') {
      config.params = {}
    }
    config.params.__preventCache = new Date().getTime()
  }

  let token = getToken()
  if (typeof token !== "undefined") {
    config.headers['Authorization'] = getToken() // 请求头带上token
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  } else {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  return config
})

axios.interceptors.response.use((response) => {
  const {code, msg} = response.data;

  if (code >= 200 && code < 300) {
    return response;
  }

  if (code === 401) {
    Modal.alert('系统提示', '登录状态已过期，您可以继续留在该页面，或者重新登录',
      [
        {
          text: '重新登录', onPress: () => {
            removeToken()
            let { dispatch } = store
            dispatch(routerRedux.push('/login'));
          }
        },
        {text: '取消', onPress: () => removeToken()}
      ]
    )
    return response
  } else {
    console.log(`请求错误 ${code}, ${msg}`)
    Toast.fail(`请求错误 ${code}, ${msg}`)
  }
  return response
})


// function parseJSON(response) {
//   return response.json();
// }

// function checkStatus(response) {
//   const res = response.clone().json();
//   const {code, msg} = res;
//
//   if (code >= 200 && code < 300) {
//     return response;
//   }
//
//   if (code === 401) {
//     Modal.alert('系统提示', '登录状态已过期，您可以继续留在该页面，或者重新登录',
//       [
//         {text: '重新登录', onPress: () => this.props.dispatch(routerRedux.push('/login'))},
//         {text: '取消', onPress: () => removeToken()}
//       ]
//     )
//   } else {
//     console.log(`请求错误 ${code}, ${msg}`)
//     Toast.fail(`请求错误 ${code}, ${msg}`)
//   }
//   // return response
//
//   const error = new Error(msg);
//   error.name = code;
//   error.response = response;
//   throw error;
// }

/**
 * Requests a URL, returning a promise.
 *
 * @return {object}           An object containing either "data" or "err"
 * @param opt
 */
export default function request(opt) {
  return axios(opt)
    .then((response) => {
      // >>>>>>>>>>>>>> 请求成功 <<<<<<<<<<<<<<
      console.log(`【${opt.method} ${opt.url}】请求成功，响应数据：%o`, response);
      return {...response};
    })
    .catch((error) => {
      // >>>>>>>>>>>>>> 请求失败 <<<<<<<<<<<<<<
      // 请求配置发生的错误
      if (!error.response) {
        return console.log('Error', error.message);
      }

      // 响应时状态码处理
      const status = error.response.code;
      const errortext = codeMessage[status] || error.response.statusText;

      Toast(error.response.msg);

      // 存在请求，但是服务器的返回一个状态码，它们都在2xx之外
      const {dispatch} = store;

      if (status === 401) {
        dispatch(routerRedux.push('/login'));
      } else if (status === 403) {
        dispatch(routerRedux.push('/exception/403'));
      } else if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push('/exception/500'));
      } else if (status >= 404 && status < 422) {
        dispatch(routerRedux.push('/exception/404'));
      }

      // 开发时使用，上线时删除
      console.log(`【${opt.method} ${opt.url}】请求失败，响应数据：%o`, error.response);

      return {code: status, msg: errortext};
    });
}
