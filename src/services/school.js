import request from './request';

export default {
  addSchool: payload => {
    return request.post('api/admin/v1/school/add-school', payload);
  },
  editSchool: payload => {
    return request.post('api/admin/v1/school/edit-school', payload);
  },
  deleteSchool: payload => {
    return request.post('api/admin/v1/school/delete-school', payload);
  },
  restoreSchool: payload => {
    return request.post('api/admin/v1/school/restore-school', payload);
  },
};
