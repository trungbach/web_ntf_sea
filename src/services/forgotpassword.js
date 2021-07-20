import request from './request';

export default {
  confirm: (payload) => {
    return request.post('api/v1/auth/forgot-pass', payload);
  },

  sendotp :(payload) => {
    return request.post('api/v1/auth/send-otp', payload);
  },

  checkotp :(payload) => {
    return request.post('api/v1/auth/check-otp', payload);
  },

};