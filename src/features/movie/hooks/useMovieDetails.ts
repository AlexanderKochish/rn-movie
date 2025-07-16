import { getMovieById } from '@/src/shared/api/moviedb.api'
import { useQuery } from '@tanstack/react-query'

export const useMovieDetails = (movieId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['details', movieId],
    queryFn: () => getMovieById(movieId),
  })
  return {
    data,
    ...rest,
  }
}
