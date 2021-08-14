import assetService from '@/services/asset'

export async function getListItem(payload) {
   
    const res = await assetService.getListItem(payload)
    return res.body.data
}

export async function getMyAsset(payload) {
   
    try {
        const res = await assetService.getMyAsset(payload)
        return {status: 200, res}
    } catch(err) {
        if(err.status === 401) {
            return {status: 401}
        }
    }
}

export async function getMyCreated(payload) {

    try {
        const res = await assetService.getMyCreated(payload)
        return {status: 200, res}
    } catch(err) {
        if(err.status === 401) {
            return {status: 401}
        }
    }
}
  
export async function getMyFavorited(payload) {
   
    try {
        const res = await assetService.getMyFavorited(payload)
        return {status: 200, res}
    } catch(err) {
        if(err.status === 401) {
            return {status: 401}
        }
    }
}
  
    