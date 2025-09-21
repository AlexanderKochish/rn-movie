import { movieRepository } from "@/src/shared/api";
import { useQueries } from "@tanstack/react-query";

export const useHomeMovies = () => {
    const queries = useQueries({
        queries: [
            {
                queryKey: ["trending-movies"],
                queryFn: movieRepository.getTrendigMovies,
            },
            {
                queryKey: ["popular-movies"],
                queryFn: () => movieRepository.getMoviesByCategory("popular"),
            },
            {
                queryKey: ["top-rated-movies"],
                queryFn: () => movieRepository.getMoviesByCategory("top_rated"),
            },
            {
                queryKey: ["upcoming-movies"],
                queryFn: () => movieRepository.getMoviesByCategory("upcoming"),
            },
            {
                queryKey: ["now-playing-movies"],
                queryFn: () =>
                    movieRepository.getMoviesByCategory("now_playing"),
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
        isRefetching: queries.some((query) => query.isRefetching),
        refetch: {
            trending: queries[0].refetch,
            popular: queries[1].refetch,
            topRated: queries[2].refetch,
            upcoming: queries[3].refetch,
            nowPlaying: queries[4].refetch,
            all: () => queries.forEach((query) => query.refetch()),
        },
    };
};
