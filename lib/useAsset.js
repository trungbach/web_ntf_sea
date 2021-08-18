import useSWR, {useSWRInfinite}  from 'swr';
import {getListItem} from '@/pages/api/asset' 

export const useAsset = (url, initialData) => {

    const {data, error} = useSWR(url, getListItem)
    return {data, error}
    
}

