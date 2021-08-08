import request from "./request"

const assetService = {
    getListItem: payload => {
        return request.get('/items', payload)
    }
}

export default assetService;