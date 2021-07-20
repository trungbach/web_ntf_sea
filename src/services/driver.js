import request from './request';

export default {
  getListDriver: payload => {
    return request.get('api/admin/v1/driver/get', payload);
  },
  addDriver: payload => {
    return request.post('api/admin/v1/driver/add', payload);
  },
  editDriver: payload => {
    return request.post('api/admin/v1/driver/edit', payload);
  },
  deleteDriver: payload => {
    return request.post('api/admin/v1/driver/delete', payload);
  },
  restoreDriver: payload => {
    return request.post('api/admin/v1/driver/restore', payload);
  },
};
