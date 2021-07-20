import userService from '@/services/admin';
import cookie from 'js-cookie';
import { router } from 'umi';
import { message } from 'antd';

export default {
  namespace: 'LOGIN',
  state: {
    loginLoading: false,
    
  },
  reducers: {
    startLogin(state) {
      return {
        ...state,
        loginLoading: true,
      };
    },
    
    loginSuccess(state, action) {
      const { accessToken, firebaseAccessToken } = action.payload;
      cookie.set('token', accessToken, { expires: 1 });
      localStorage.setItem('Admin', JSON.stringify(action.payload));
      return {
        ...state,
        loginLoading: false,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loginLoading: false,
      };
    },
  },

  effects: {
    *login(action, { call, put }) {
      yield put({ type: 'startLogin' });
      try {
        const res = yield call(userService.login, action.payload);
        if (res.status === 200) {
          yield put({ type: 'loginSuccess', payload: res.body.data });
          router.push({ pathname: '/admin/overview' });
          message.info('Đăng nhập thành công');
        } else {
          message.error(res.body.message);
          yield put({ type: 'loginFail' });
        }
      } catch (error) {
        try{
          var data = JSON.parse(error.message)
          message.error(data.message);
        }catch (error) {
          message.error('Có lỗi xảy ra!');
        }
        yield put({ type: 'loginFail' });
      }
    },

    // *getSchool(action, {call, put}){
    //   try {
    //     const res = yield call(userService.getSchool, action.payload);
    //     yield put({ type: 'getSchoolSuccess', payload: res.body });
    //   } catch (error) {
    //     try{
    //       var data = JSON.parse(error.message)
    //       message.error(data.message);
    //     }catch (error) {
    //       message.error('Có lỗi xảy ra!');
    //     }
    //     yield put({ type: 'error' });
    //   }
    // },
  },
};
