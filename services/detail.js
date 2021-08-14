import request from './request'

const detailService = {
    
    getDetailItem: payload => {
        return request.getWithAccessToken(`/items/${payload.id}`,{}, payload.token)
    },
    
    getMoreFromCollection: payload => {
        return request.get('/items', payload);
    },
    
    getDetailNtfBlock: payload => {
        return request.get(`/itemnft-by-id/${payload.id}`);
    },

    buyItem: payload => {
        return request.put(`/buy-item/${payload.id}`);
    },

}

export default detailService;