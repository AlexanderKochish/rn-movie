import { getMoviesByCategory, getTrendigMovies } from "@/src/shared/api";
import { useQueries } from "@tanstack/react-query";

export const useHomeMovies = () => {
    const queries = useQueries({
        queries: [
            { queryKey: ["trending-movies"], queryFn: getTrendigMovies },
            {
                queryKey: ["popular-movies"],
                queryFn: () => getMoviesByCategory("popular"),
            },
            {
                queryKey: ["top-rated-movies"],
                queryFn: () => getMoviesByCategory("top_rated"),
            },
            {
                queryKey: ["upcoming-movies"],
                queryFn: () => getMoviesByCategory("upcoming"),
            },
            {
                queryKey: ["now-playing-movies"],
                queryFn: () => getMoviesByCategory("now_playing"),
            },
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
