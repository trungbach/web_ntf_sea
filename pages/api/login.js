import loginService from '@/services/login'

export async function checkPublicAddress(payload) {
    const res = loginService.checkPublicAddress(payload);
    return res;
}

export async function verifySignature(payload) {
    const res = loginService.verifySignature(payload);
    return res;
}
