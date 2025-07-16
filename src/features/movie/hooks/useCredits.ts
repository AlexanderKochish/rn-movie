import { getMovieCredits } from '@/src/shared/api/moviedb.api'
import { useQuery } from '@tanstack/react-query'

export const useCredits = (movieId: number) => {
  const { data: credits, ...rest } = useQuery({
    queryKey: ['credits', movieId],
    queryFn: () => getMovieCredits(movieId),
  })

  return {
    credits,
    ...rest,
  }
}
