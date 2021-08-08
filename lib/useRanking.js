import useSWR, {useSWRInfinite}  from 'swr';
import {getRankingCollection} from '@/pages/api/ranking';

export const useRanking = (url, rankingCollection) => {
    const {data, error} = useSWR(url, getRankingCollection, {initialData: rankingCollection})
    return {data, error}
}
