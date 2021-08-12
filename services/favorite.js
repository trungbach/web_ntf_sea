import request from './request'

const favoriteService = {
    
    createFavorite: payload => {
        console.log('payload', payload)
        return request.post(`/create-favorites`, payload);
    },
    
    deleteFavorite: payload => {
        return request.post('/delete-favorites', payload);
    },
    
}

export default favoriteService;