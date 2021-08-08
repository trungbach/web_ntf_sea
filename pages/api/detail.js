import detailService from '@/services/detail'

export async function getDetailItem(payload) {
    const res = await detailService.getDetailItem(payload);
    return res.body;
}

export async function getMoreFromCollection(payload) {
    const res = await detailService.getMoreFromCollection(payload);
    return res.body.data;
}

