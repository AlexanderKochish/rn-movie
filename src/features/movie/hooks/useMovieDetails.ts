import { getMovieById } from "@/src/shared/api";
import { MovieDetailsType } from "@/src/shared/types/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const useMovieDetails = (movieId: number) => {
  const router = useRouter();
  const { data, ...rest } = useQuery<MovieDetailsType, Error>({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieById(movieId),
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
