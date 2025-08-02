import { getMovieCredits } from '@/src/shared/api'
import { MovieCredits } from '@/src/shared/types/types'
import { useQuery } from '@tanstack/react-query'

export const useCredits = (movieId: number) => {
  const { data: credits, ...rest } = useQuery<MovieCredits, Error>({
    queryKey: ['credits', movieId],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    retry: false,
  })

  return {
    credits,
    ...rest,
  }
}
