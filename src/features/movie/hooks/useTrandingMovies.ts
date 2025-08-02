import { getTrendigMovies } from '@/src/shared/api'
import { MoviesResponse } from '@/src/shared/types/types'
import { useQuery } from '@tanstack/react-query'

export const useTrendingMovies = () => {
  const { data, ...rest } = useQuery<MoviesResponse, Error>({
    queryKey: ['trending-movie'],
    queryFn: getTrendigMovies,
  })

  return {
    trending: data?.results,
    ...rest,
  }
}
