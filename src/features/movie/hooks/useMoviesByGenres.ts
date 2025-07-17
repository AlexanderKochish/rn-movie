import { getMoviesByGenre } from '@/src/shared/api/moviedb.api'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

export const useMoviesByGenres = () => {
  const [genreIds, setGenreId] = useState<number[]>([])

  const { data: moviesByGenres, ...rest } = useQuery({
    queryKey: ['moviesByGenres', genreIds],
    queryFn: () => getMoviesByGenre(genreIds),
  })

  const handleGenre = useCallback(
    (id: number) => {
      if (!genreIds.includes(id)) {
        setGenreId((prev) => [...prev, id])
      } else {
        setGenreId((prev) => prev.filter((genreId) => genreId !== id))
      }
    },
    [genreIds]
  )

  return {
    moviesByGenres: moviesByGenres?.results,
    handleGenre,
    genreIds,
    ...rest,
  }
}
