import request from './request';

export default {
  addGroupChat: payload => {
    return request.post('api/admin/v1/chat/join-chat', payload);
  },
  getGroupsChat: payload => {
    return request.get('api/admin/v1/chat/get-groups', payload);
  },
};
