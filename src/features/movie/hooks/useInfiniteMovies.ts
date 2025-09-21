import { useInfiniteQuery } from "@tanstack/react-query";
import { MoviesResponse } from "../types/types";

type Props = {
    queryKey: string[];
    fetchFunction: (page: number) => Promise<MoviesResponse>;
    enabled?: boolean;
};

export const useInfiniteMovies = (
    { queryKey, fetchFunction, enabled = true }: Props,
) => {
    return useInfiniteQuery<MoviesResponse, Error>({
        queryKey,
        queryFn: ({ pageParam = 1 }) => fetchFunction(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }

            return undefined;
        },

        getPreviousPageParam: (firstPage) => {
            if (firstPage.page > 1) {
                return firstPage.page - 1;
            }
            return undefined;
        },
        enabled,
    });
};
