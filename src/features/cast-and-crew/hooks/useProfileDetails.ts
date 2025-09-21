import { useQuery } from "@tanstack/react-query";
import { castRepository } from "../api/castRepository";

export const useProfileDetails = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["person-details", id],
    queryFn: () => castRepository.getPersonDetailsById(id),
    enabled: !!id,
    retry: false,
  });

  const { data: personMovieCredits } = useQuery({
    queryKey: ["person-movie-credits", id],
    queryFn: () => castRepository.getPersonMoviesCredit(id),
    enabled: !!id,
    retry: false,
  });

  return {
    data,
    personMovieCredits,
    ...rest,
  };
};
