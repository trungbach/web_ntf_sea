import request from './request';

export default {
  getAbsences: payload => {
    return request.get('api/admin/v1/absence/get-absences', payload);
  },

  getHistory: payload => {
    return request.get('api/parent/v1/absence/get-history', payload);
  },
};
