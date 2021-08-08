import rankingService from '@/services/ranking'

export async function getRankingCollection(payload) {
    const res = await rankingService.getRankingCollection(payload);
    return res.body.data;
}
