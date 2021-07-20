import request from './request';

export default {
  getAllSchool: (payload) => {
    return request.get('api/admin/v1/school/get-schools', payload);
  },
  getCountUnread: (payload) => {
    return request.get('api/admin/v1/chat/get-count-unread', payload);
  },

  changeUserPassword : payload => {
    return request.post('api/v1/user/change-password', payload);
  },

  updateProfile : payload => {
    return request.post('api/v1/user/update-profile', payload);
  },
};
