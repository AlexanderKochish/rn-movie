import { getPersonDetailsById, getPersonMoviesCredit } from '@/src/shared/api'
import { useQuery } from '@tanstack/react-query'

export const useProfileDetails = (id: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['person-details', id],
    queryFn: () => getPersonDetailsById(id),
    enabled: !!id,
    retry: false,
  })

  const { data: personMovieCredits } = useQuery({
    queryKey: ['person-movie-credits', id],
    queryFn: () => getPersonMoviesCredit(id),
    enabled: !!id,
    retry: false,
  })

  return {
    data,
    personMovieCredits,
    ...rest,
  }
}
