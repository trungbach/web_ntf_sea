import request from './request';

export default {
  getVehiclesJourneys: payload => {
    return request.get('api/admin/v1/building-journey/get-by-vehicle', payload);
  },
  getPointByJourney: payload => {
    return request.get('api/admin/v1/building-journey/get-point-by-journey', payload);
  },

  addJourney: payload => {
    return request.post('api/admin/v1/building-journey/add', payload);
  },

  editJourney: payload => {
    return request.post('api/admin/v1/building-journey/edit', payload);
  },

  getChildsByPoint: payload => {
    return request.get('api/admin/v1/building-journey/get-children-by-point', payload);
  },

  addChildsToPoint: payload => {
    return request.post('api/admin/v1/building-journey/add-child-to-journey-point', payload);
  },

  addVehicleJourney: payload => {
    return request.post('api/admin/v1/building-journey/add-vehicle-to-journey', payload);
  },

  getAllJourney: payload => {
    return request.get('api/admin/v1/building-journey/get', payload);
  },

  deleteJourney: payload => {
    return request.post('api/admin/v1/building-journey/delete', payload);
  },

  restoreJourney: payload => {
    return request.post('api/admin/v1/building-journey/restore', payload);
  },

  getJourneyHistory: payload => {
    return request.get('api/admin/v1/journey/get-journey-history', payload);
  },

  getPointsByJourneyHistory: payload => {
    return request.get('api/admin/v1/journey/get-journey-point-history', payload);
  },

  getChildsByPointHistory: payload => {
    return request.get('api/admin/v1/journey/get-point-children-history', payload);
  },

};
