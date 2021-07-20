import overviewService from '@/services/overview';
import { message } from 'antd';
// import { router } from 'umi';
export default {
  namespace: 'OVERVIEW',
  state: {
    childrenLoading: false,
    summaryLoading: false,
    completedLoading:false,
    summaryResponse:[],
    childrenResponse:[],
    completedResponse:[],
  },


  reducers: {
    viewChildren(state) {
      return {
        ...state,
        childrenLoading: true,
      };
    },

    viewSummary(state){
      return{
        ...state,
        summaryLoading:true,
      };
    },

    viewCompleted(state){
      return{
        ...state,
        completedLoading:true,
      };
    },

    overviewCompletedSuccess(state, action){
      return{
        ...state,
        completedLoading:false,
        completedResponse:action.payload,
      };
    },

    overviewCompletedFail(state){
      return{
        ...state,
        completedLoading:false,
      };
    },

    overviewSummarySuccess(state, action){
      return{
        ...state,
        summaryLoading:false,
        summaryResponse:action.payload,
      };
    },

    overviewSummaryFail(state){
      return{
        ...state,
        summaryLoading:false,
      };
    },

    overviewChildrenSuccess(state, action) {
      return {
        ...state,
        childrenLoading: false,
        childrenResponse:action.payload,
      };
    },
    overviewChildrenFail(state){
      return{
        ...state,
        childrenLoading:false,
      };
    },
  },

  effects: {
    *overviewChildren(action, { call, put }) {
      yield put({ type: 'viewChildren' });
      try {
        const rest = yield call(overviewService.overviewChildren, action.payload);
        if (rest.status === 200) {
          yield put({ type: 'overviewChildrenSuccess', payload: rest.body.data });
        } else {
          message.error(rest.body.message);
          yield put({ type: 'overviewChildrenFail' });
        }
      } catch (error) {
        try{
          var data = JSON.parse(error.message)
          message.error(data.message);
        }catch (error) {
          message.error('Có lỗi xảy ra!');
        }
        yield put({ type: 'overviewChildrenFail' });
      }
    },

    *overviewSummary(action, { call, put }) {
      yield put({ type: 'viewSummary' });
      try {
        const rest = yield call(overviewService.overviewSummary, action.payload);
        if (rest.status === 200) {
          yield put({ type: 'overviewSummarySuccess', payload: rest.body.data });
        } else {
          message.error(rest.body.message);
          yield put({ type: 'overviewSummaryFail' });
        }
      } catch (error) {
        try{
          var data = JSON.parse(error.message)
          message.error(data.message);
        }catch (error) {
          message.error('Có lỗi xảy ra!');
        }
        yield put({ type: 'overviewSummaryFail' });
      }
    },

    *overviewCompleted(action, { call, put }) {
      yield put({ type: 'viewCompleted' });
      try {
        const rest = yield call(overviewService.overviewCompleted, action.payload);
        if (rest.status === 200) {
          yield put({ type: 'overviewCompletedSuccess', payload: rest.body.data });
        } else {
          message.error(rest.body.message);
          yield put({ type: 'overviewCompletedFail' });
        }
      } catch (error) {
        try{
          var data = JSON.parse(error.message)
          message.error(data.message);
        }catch (error) {
          message.error('Có lỗi xảy ra!');
        }
        yield put({ type: 'overviewCompletedFail' });
      }
    },
  },
};
