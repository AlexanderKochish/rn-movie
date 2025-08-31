import { getGenres } from "@/src/shared/api";
import { Genres } from "@/src/shared/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGenres = () => {
  const { data, ...rest } = useQuery<{ genres: Genres[] }, Error>({
    queryKey: ["genres"],
    queryFn: getGenres,
    retry: false,
  });

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => data?.genres?.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .slice(0, 2)
      .join(" • ");
  };

  return {
    genres: data?.genres,
    getGenreNames,
    ...rest,
  };
};
