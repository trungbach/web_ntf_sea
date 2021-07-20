import request from './request';

export default {
  getListStudent: payload => {
    return request.get('api/admin/v1/children/get-children', payload);
  },
  addStudent: payload => {
    return request.post('api/admin/v1/children/add-child', payload);
  },
  editStudent: payload => {
    return request.post('api/admin/v1/children/edit-child', payload);
  },
  deleteStudent: payload => {
    return request.post('api/admin/v1/children/delete-child', payload);
  },
  restoreStudent: payload => {
    return request.post('api/admin/v1/children/restore-child', payload);
  },
  getClassList: payload => {
    return request.get('api/admin/v1/children/get-class', payload);
  },
  exportChild: payload => {
    return request.download('api/admin/v1/children/export-pdf', payload);
  },
};
