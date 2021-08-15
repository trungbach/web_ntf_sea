import request from "./request"

const assetService = {

    getListItem: payload => {
        return request.get('/items', payload)
    },

    getMyAsset: payload => {
        return request.getWithAccessToken('/my-assets-items', {}, payload.token, payload.res, payload.from)
    },

    getMyCreated: payload => {
        return request.getWithAccessToken('/my-created-items', {}, payload.token, payload.res, payload.from)
    },

    getMyFavorited: payload => {
        return request.getWithAccessToken('/favorite-items', {}, payload.token, payload.res, payload.from)
    }

}

export default assetService;