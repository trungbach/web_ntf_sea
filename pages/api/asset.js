import assetService from '@/services/asset'

export async function getListItem(payload) {
   
    const res = await assetService.getListItem(payload)
    return res.body.data
}
    