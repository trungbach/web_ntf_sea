import useSWR, {useSWRInfinite} from "swr";
import config from "@/config";

const fetcher = url => fetch(url).then(res => res.json());

export const useGetPosts = path => {
    if(!path) {
        throw new Error('Path is required');
    }

    const url = config.API_DOMAIN + path;
    const { data: posts, error } = useSWR(url, fetcher);

    return {posts, error};
}

export const usePaginatePosts = path => {
    if(!path) {
        throw new Error('Path is required');
    }

    const url = config.API_DOMAIN + path;
    const PAGE_LIMIT = 5;

    const { data, error, size, setSize } = useSWRInfinite(index => `${url}?_page=${index + 1}&_litmit=${PAGE_LIMIT}`, fetcher)

    const posts = data || [];

    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size -  1] === 'undefined');

    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length -1]?.length < PAGE_LIMIT)

    return { posts, error, isLoadingMore, size, setSize, isReachingEnd };
}
