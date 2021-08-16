import request from "./request"

const assetService = {

    getListItem: payload => {
        return request.get('/items', payload)
    },

    getMyAsset: payload => {
        return request.getWithAccessToken('/my-assets-items', {}, payload.req, payload.res)
    },

    getMyCreated: payload => {
        return request.getWithAccessToken('/my-created-items', {}, payload.req, payload.res)
    },

    getMyFavorited: payload => {
        return request.getWithAccessToken('/favorite-items', {}, payload.req, payload.res)
    }

}

export default assetService;