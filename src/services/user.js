import request from './request';

export default {
  getListUser: payload => {
    return request.get('api/admin/v1/user/get-user', payload);
  },
  getUserInfo: payload => {
    return request.get('api/v1/user/get-profile', payload);
  },
  addUser: payload => {
    return request.post('api/admin/v1/auth/add-user', payload);
  },
  editUser: payload => {
    return request.post('api/admin/v1/user/edit-user', payload);
  },
  deleteUser: payload => {
    return request.post('api/admin/v1/user/delete-user', payload);
  },
  restoreUser: payload => {
    return request.post('api/admin/v1/user/restore-user', payload);
  },
  changeUser : payload => {
    return request.post('api/v1/user/change-password', payload);
  }
};
