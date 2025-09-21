import { MovieCredits } from "@/src/shared/types/types";
import { useQuery } from "@tanstack/react-query";
import { castRepository } from "../api/castRepository";

export const useCredits = (movieId: number) => {
  const { data: credits, ...rest } = useQuery<MovieCredits, Error>({
    queryKey: ["credits", movieId],
    queryFn: () => castRepository.getMovieCredits(movieId),
    enabled: !!movieId,
    retry: false,
  });

  return {
    credits,
    ...rest,
  };
};
