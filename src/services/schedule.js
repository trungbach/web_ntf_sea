import request from './request';

export default {
  getListSchedule: payload => {
    return request.get('api/admin/v1/schedule-journey/get', payload);
  },
  getAllDriver: payload => {
    return request.get('api/admin/v1/driver/get-all', payload);
  },
  getAllProtector: payload => {
    return request.get('api/admin/v1/user/get-all-protector', payload);
  },
  getAllJourney: payload => {
    return request.get('api/admin/v1/building-journey/get-all', payload);
  },
  getAllVehicle: payload => {
    return request.get('api/admin/v1/vehicle/get-all', payload);
  },
  addSchedule: payload => {
    return request.post('api/admin/v1/schedule-journey/add', payload);
  },
  editSchedule: payload => {
    return request.post('api/admin/v1/schedule-journey/edit', payload);
  },
  deleteSchedule: payload => {
    return request.post('api/admin/v1/schedule-journey/delete', payload);
  },
};
