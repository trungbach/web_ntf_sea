import useSWR, {useSWRInfinite}  from 'swr';
import {getItemByCategory} from '@/pages/api/collection' 

export const useCollection = (url) => {
    const {data, error} = useSWR(url, getItemByCategory)
    return {data, error}
}
