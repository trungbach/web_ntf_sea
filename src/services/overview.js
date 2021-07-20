import request from './request';

export default {
  
  overviewChildren: payload => {
    return request.get('api/admin/v1/statistic/children-on-car', payload);
  },

  overviewSummary: payload => {
    return request.get('api/admin/v1/statistic/summary', payload);
  },

  overviewCompleted: payload => {
    return request.get('api/admin/v1/statistic/journey-completed?', payload);
  },
};
