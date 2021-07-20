// import changeUserService from '@/services/logout'
// import {message} from 'antd'

// export default {
//   namespace : LOGOUT_SERVICES,
//   state:{
//     changeUserLoading: false,
//   },
  
//   reducers : {
//     ChangeUser(state){
//       return {
//         ...state,
//         changeUserLoading:true
//       };
      
//     },

//     ChangeUserSuccess(state, action){
//       return {
//         ...state,
//         changeUserLoading: false,
//         changeUserResponse: action.payload
//       };
//     },

//     ChangeUserFail(state){
//       return{
//         ...state,
//         changeUserLoading:false
//       }
//     }
//   },

  

//   effects: {
//     *changeUserPassword(action, { call, put }) {
//       yield put({ type: 'ChangeUser' });
//       try {
//         const rest = yield call(changeUserService.changeUserPassword, action.payload);
//         if (rest.status === 200) {
//           yield put({ type: 'ChangeUserSuccess', payload: rest.body.data });
//           message.info('đổi mật khẩu thành công');
//         } else {
//           message.error(rest.body.message);
//           yield put({ type: 'ChangeUserFail' });
//         }
//       } catch (error) {
//         try{
//           var data = JSON.parse(error.message)
//           message.error(data.message);
//         }catch (error) {
//           message.error('Có lỗi xảy ra!');
//         }
//         yield put({ type: 'ChangeUserFail' });
//       }
//     },
//   }
// }