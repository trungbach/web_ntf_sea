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
    const res = await collectionService.getMyCollection(payload)
    return res.body.data
}

export async function getCollectionByName(payload) {
    const res = await collectionService.getCollectionByName(payload)
    return res.body.data
}