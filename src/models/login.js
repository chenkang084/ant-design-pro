import { routerRedux } from 'dva/router';
import { accountLogin, accountLogout } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      // hard code the user
      response.currentAuthority = 'admin';
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { call, put, select }) {
      try {
        const response = yield call(accountLogout);
        if (response.status === 'ok') {
          // get location pathname
          const urlParams = new URL(window.location.href);
          const pathname = yield select(
            (state) => state.routing.location.pathname, // eslint-disable-line
          );
          // add the parameters in the url
          urlParams.searchParams.set('redirect', pathname);
          window.history.replaceState(null, 'login', urlParams.href);

          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: false,
              currentAuthority: 'guest',
            },
          });
          reloadAuthorized();
          yield put(routerRedux.push('/user/login'));
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type || 'account',
      };
    },
  },
};
