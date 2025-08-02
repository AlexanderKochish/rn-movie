import { getTrendigMovies } from '@/src/shared/api'
import { useQuery } from '@tanstack/react-query'

export const useTrendingMovies = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendigMovies,
  })

  return {
    trending: data?.results,
    ...rest,
  }
}
