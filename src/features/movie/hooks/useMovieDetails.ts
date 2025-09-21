import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { movieRepository } from "../api/movie.api";
import { MovieDetailsType } from "../types/types";

export const useMovieDetails = (movieId: number) => {
  const router = useRouter();
  const { data, ...rest } = useQuery<MovieDetailsType, Error>({
    queryKey: ["movie-details", movieId],
    queryFn: () => movieRepository.getMovieById(movieId),
    enabled: !!movieId,
    retry: false,
  });

  useEffect(() => {
    if (!rest.isLoading && !data) {
      router.replace("/+not-found");
    }
  }, [data, router, rest.isLoading]);

  return {
    data,
    ...rest,
  };
};
