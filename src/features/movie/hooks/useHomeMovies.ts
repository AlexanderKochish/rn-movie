import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getTrendigMovies,
    getUpcomingMovies,
} from "@/src/shared/api";
import { useQueries } from "@tanstack/react-query";

export const useHomeMovies = () => {
    const queries = useQueries({
        queries: [
            { queryKey: ["trending-movies"], queryFn: getTrendigMovies },
            { queryKey: ["popular-movies"], queryFn: getPopularMovies },
            { queryKey: ["top-rated-movies"], queryFn: getTopRatedMovies },
            { queryKey: ["upcoming-movies"], queryFn: getUpcomingMovies },
            { queryKey: ["now-playing-movies"], queryFn: getNowPlayingMovies },
        ],
    });

    return {
        trending: queries[0].data?.results,
        popular: queries[1].data?.results,
        topRated: queries[2].data?.results,
        upcoming: queries[3].data?.results,
        nowPlaying: queries[4].data?.results,
        isLoading: queries.some((query) => query.isLoading),
        isError: queries.some((query) => query.error),
    };
};
