import { getGenres } from '@/src/shared/api'
import { Genres } from '@/src/shared/types/types'
import { useQuery } from '@tanstack/react-query'

export const useGenres = () => {
  const { data: genres, ...rest } = useQuery<{ genres: Genres[] }, Error>({
    queryKey: ['genres'],
    queryFn: getGenres,
  })

  return {
    genres,
    ...rest,
  }
}
