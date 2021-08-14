import collectionService from '@/services/collection'

export async function getListCollection() {
    const res = await collectionService.getListCollection();
    return res.body.data;
}

export async function getCollectionBySlug(payload) {
    const res = await collectionService.getCollectionBySlug(payload);
    return res.body.data;
}

export async function getItemByCategory(payload) {
    const res = await collectionService.getItemByCategory(payload)
    return res.body.data
}

export async function getMyCollection(payload) {
    try {
        const res = await collectionService.getMyCollection(payload)
        return {status: 200, res}
    } catch(err) {
        if(err.status === 401) {
            return {status: 401}
        }
    }
}

export async function getCollectionByName(payload) {
    const res = await collectionService.getCollectionByName(payload)
    return res.body.data
}