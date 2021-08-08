import request from './request'

const detailService = {
    
    getDetailItem: payload => {
        return request.getWithAccessToken(`/items/${payload.id}`);
    },
    
    getMoreFromCollection: payload => {
        return request.get('/items', payload);
    },

}

export default detailService;