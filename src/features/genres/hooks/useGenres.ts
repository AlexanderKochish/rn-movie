import { useQuery } from "@tanstack/react-query";
import { genresRepository } from "../api/genres.repository";
import { Genres } from "../types/types";

export const useGenres = () => {
  const { data, ...rest } = useQuery<{ genres: Genres[] }, Error>({
    queryKey: ["genres"],
    queryFn: genresRepository.getGenres,
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
