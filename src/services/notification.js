import request from './request';

export default {
  getNotifications: payload => {
    return request.get('api/admin/v1/notification/get-list', payload);
  },
  addNotification: payload => {
    return request.post('api/admin/v1/notification/add', payload);
  },
};
