import { message } from 'antd';
import masterService from '@/services/masterData';
import cookie from 'js-cookie';
import { router } from 'umi';
import _ from 'lodash'
export default {
  namespace: 'MASTERDATA',
  state: {
    schools: [],
    vehicle: undefined,
    schoolId: undefined,
    countUnread:[],
    changeUserLoading: false,
    // getAllSchoolLoading: false,
    updateAdmin: undefined,
    hideSchools: false,
  },
  reducers: {

    getMessageManageSuccess(state){ 
      return{
        ...state,
      };
    },
    getCountUnreadSuccess(state, action){
        return{
        ...state,
        countUnread:action.payload,
      };
    },

    getListSchoolSuccess(state, action) {
      if(state.schoolId){
        return {
          ...state,
          schools: action.payload,
          loading: false
        };
      }else{
        var oldSchoolId = localStorage.getItem("schoolId");
        var schoolId;
        if(oldSchoolId){
          var index = _.findIndex(action.payload, function(o) { return o.id == Number(oldSchoolId); });
          if(index >= 0){
            schoolId = Number(oldSchoolId)
          }else{
            schoolId = localStorage.setItem("schoolId", action.payload[0].id)
          }
        }else{
          schoolId = localStorage.setItem("schoolId", action.payload[0].id)
        }
        return {
          ...state,
          schools: action.payload,
          loading: false,
          schoolId: schoolId,
        };
      }
    },

    vehicleSuccess(state, action) {
      return {
        ...state,
        vehicle: action.payload,
      };
    },

    updateSchoolId(state, action) {
      localStorage.setItem("schoolId", action.payload.id)
      return {
        ...state,
        schoolId: action.payload.id,
        countUnread:action.payload,
      };
    },

    ChangeUser(state){
      return {
        ...state,
        changeUserLoading:true
      };
      
    },

    ChangeUserSuccess(state, action){
      return {
        ...state,
        changeUserLoading: false,
        changeUserResponse: action.payload
      };
    },

    ChangeUserFail(state){
      return{
        ...state,
        changeUserLoading:false
      }
    },

    editUserAdminSuccess(state, action){
      localStorage.setItem('Admin', JSON.stringify(action.payload));
      return{
        ...state,
        updateAdmin:action.payload
      }
    },

    showOrHideSchoolSuccess(state, action){
      var hideSchools = action.payload.hideSchools
      return{
        ...state,
        hideSchools:hideSchools
      }
    },
  },


  effects: {
    *getMessageManage(action,{put}){
      yield put({ type: 'getMessageManageSuccess', payload: {} });
    },
    *getCountUnread(action, { call, put }) {
      try {
        const res = yield call(masterService.getCountUnread, action.payload);
        yield put({ type: 'getCountUnreadSuccess', payload: res.body.data });
      } catch (error) {
        try{
          var data = JSON.parse(error.message)
          message.error(data.message);
        }catch (error) {
          message.error('Có lỗi xảy ra!');
        }
        yield put({ type: 'error' });
      }
    },
    
    *getListSchool(action, { call, put }) {
      if(cookie.get('token') !== undefined){
        try {
          if(action.payload.deleted === undefined){
            action.payload.deleted = false
          }
          const res = yield call(masterService.getAllSchool, action.payload);
          yield put({ type: 'getListSchoolSuccess', payload: res.body.data });
        } catch (error) {
          try{
            var data = JSON.parse(error.message)
            message.error(data.message);
          }catch (error) {
            message.error('Có lỗi xảy ra!');
          }
        }
      }else{
        router.push({ pathname: '/login' });
      }
    },

    *vehicle(action, { call, put }) {
      yield put({ type: 'vehicleSuccess', payload: action.payload });
    },

    *updateSchool(action, { call, put }) {
      yield put({ type: 'updateSchoolId', payload: action.payload });
    },

    *changeUserPassword(action, { call, put }) {
      yield put({ type: 'ChangeUser' });
      try {
        const rest = yield call(masterService.changeUserPassword, action.payload);
        if (rest.status === 200) {
          yield put({ type: 'ChangeUserSuccess', payload: rest.body.data });
          router.push({ pathname: '/login' });
          message.info('đổi mật khẩu thành công');
        } else {
          message.error(rest.body.message);
          yield put({ type: 'ChangeUserFail' });
        }
      } catch (error) {
        try{
          var data = JSON.parse(error.message)
          message.error(data.message);
        }catch (error) {
          message.error('Có lỗi xảy ra!');
        }
        yield put({ type: 'ChangeUserFail' });
      }
    },

    *editUserAdmin(action, { call, put }) {
      try {
        const res = yield call(masterService.updateProfile, action.payload);
        yield put({ type: 'editUserAdminSuccess', payload: res.body.data });
      } catch (error) {
        try{
          var data = JSON.parse(error.message)
          message.error(data.message);
        }catch (error) {
          message.error('Có lỗi xảy ra!');
        }
        yield put({ type: 'error' });
      }
    },

    *showOrHideSchool(action, { call, put }) {
      try {
        yield put({ type: 'showOrHideSchoolSuccess', payload: action.payload });
      } catch (error) {
        yield put({ type: 'error' });
      }
    },
  },
};
