import { getGenres } from '@/src/shared/api'
import { useQuery } from '@tanstack/react-query'

export const useGenres = () => {
  const { data: genres, ...rest } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  })

  return {
    genres,
    ...rest,
  }
}
