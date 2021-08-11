import request from "./request"

const assetService = {

    getListItem: payload => {
        return request.get('/items', payload)
    },

    getMyAsset: payload => {
        return request.getWithAccessToken('/my-assets-items', {}, payload.token)
    },

    getMyCreated: payload => {
        return request.getWithAccessToken('/my-created-items', {}, payload.token)
    },

    getMyFavorited: payload => {
        return request.getWithAccessToken('/favorite-items', {}, payload.token)
    }

}

export default assetService;