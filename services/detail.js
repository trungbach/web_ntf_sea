import request from './request'

const detailService = {
    
    getDetailItem: payload => {
        console.log('payload', payload)
        return request.getWithAccessToken(`/items/${payload.id}`,{}, payload.token);
    },
    
    getMoreFromCollection: payload => {
        return request.get('/items', payload);
    },

}

export default detailService;