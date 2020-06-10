import {routerRedux} from 'dva/router';
import {agreement, agreements, employeeInfo, employeeUpdate, getAuthUrl, getSignUrl, login, logout} from "../services/service"
import {removeToken, setToken} from "../utils/cookies"
import {getPageQuery} from "../utils/utils"

export default {
  namespace: 'app',
  state: {
    locale: 'en',
    currency: 'CAD',
    ipInfo: {},
    fromCityAirport: {},
    toCityAirport: {},
    departDate: '',
    returnDate: ''
  },

  // 异步，相当于vuex actions
  effects: {

    * login({payload}, {call}) {
      let response = yield call(login, payload)
      if (response.data.code === 200) {
        setToken(response.data.token)
      }
      return response
    },
    // *loginOut(_, { put , call}){
    //   const response = yield call(logout);
    //   yield put({type: 'changeLoginStatus',
    //     payload: {
    //       status: false,
    //       currentAuthority: 'guest',
    //     },
    //   });
    //   removeToken();
    //   const { redirect } = getPageQuery();
    //   if (window.location.pathname !== '/user/login' && !redirect) {
    //     yield put(routerRedux.push('/login'))
    //     window.location.reload();
    //   }  else {
    //     window.location.reload();
    //   }
    // },

    * agreements({payload}, {call}) {
      return yield call(agreements, payload)
    },

    * agreement({payload}, {call}) {
      return yield call(agreement, payload)
    },

    * employeeInfo({payload}, {call}) {
      return yield call(employeeInfo, payload)
    },

    * employeeUpdate({payload}, {call}) {
      return yield call(employeeUpdate, payload)
    },

    * getAuthUrl({payload}, {call}) {
      return yield call(getAuthUrl, payload)
    },

    * getSignUrl({payload}, {call}) {
      return yield call(getSignUrl, payload)
    },

    * fetch({payload}, {call, put}) {  // eslint-disable-line
      return yield put({type: 'save'});
    }
  },
  // 同步更新state，相当于 Vuex mutations
  reducers: {
    updateState(state, {payload}) {
      // debugger
      return {...state, ...payload};
    },
  },

};
