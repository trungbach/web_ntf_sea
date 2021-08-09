import createServicer from '@/services/create'

export async function createItem(payload) {

    const res = await createServicer.createItem(payload);
    console.log(res);
    return res.body.data;

}

export async function createMyCollection(payload) {

    const res = await createServicer.createMyCollection(payload);
    console.log(res);
    return res;

}

// export async function upload(payload) {

//     const res = await createServicer.createItem(payload);
//     console.log(res);
//     return res.body.data;

// }


