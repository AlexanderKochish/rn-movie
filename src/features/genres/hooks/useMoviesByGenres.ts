import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { MoviesResponse } from "../../movie/types/types";
import { genresRepository } from "../api/genres.repository";

export const useMoviesByGenres = () => {
  const [genreIds, setGenreId] = useState<number[]>([]);

  const { data: moviesByGenres, ...rest } = useQuery<MoviesResponse, Error>({
    queryKey: ["moviesByGenres", genreIds],
    queryFn: () => genresRepository.getMoviesByGenre(genreIds),
    enabled: !!genreIds.length,
    retry: false,
  });

  const handleGenre = useCallback(
    (id: number) => {
      if (!genreIds.includes(id)) {
        setGenreId((prev) => [...prev, id]);
      } else {
        setGenreId((prev) => prev.filter((genreId) => genreId !== id));
      }
    },
    [genreIds],
  );

  return {
    moviesByGenres: moviesByGenres?.results || [],
    handleGenre,
    genreIds,
    setGenreId,
    ...rest,
  };
};
