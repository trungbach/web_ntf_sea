import request from './request';

export default {
  login: (payload) => {
    return request.post('api/admin/v1/auth/signin', payload);
  },


};
