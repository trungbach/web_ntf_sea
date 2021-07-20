import request from './request';

export default {
  getListCar: payload => {
    return request.get('api/admin/v1/vehicle/get-vehicles', payload);
  },
  addCar: payload => {
    return request.post('api/admin/v1/vehicle/add', payload);
  },
  getPointByJourney: payload => {
    return request.get('api/admin/v1/building-journey/get-point-by-journey', payload);
  },
  editCar: payload => {
    return request.post('api/admin/v1/vehicle/edit', payload);
  },
  deleteCar: payload => {
    return request.post('api/admin/v1/vehicle/delete', payload);
  },
  restoreCar: payload => {
    return request.post('api/admin/v1/vehicle/restore', payload);
  },

  getInfo: payload => {
    return request.get('api/admin/v1/vehicle/get-info', payload);
  },
};
