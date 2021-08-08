import request from './request'

const rankingService =  {

    getRankingCollection: payload => {
        return request.get('/collections-rankings', payload)
    },
    
}

export default rankingService