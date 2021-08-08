import request from './request'


const createService =  {
    createItem: payload => {
        return request.post('/items', payload)
    },

}

export default createService