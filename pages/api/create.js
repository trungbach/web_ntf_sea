import createServicer from '@/services/create'

export async function createItem(payload) {

    const res = await createServicer.createItem(payload);
    console.log(res);
    return res.body.data;

}

