import { getMovieById } from '@/src/shared/api/moviedb.api'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export const useMovieDetails = (movieId: number) => {
  const router = useRouter()
  const { data, ...rest } = useQuery({
    queryKey: ['details', movieId],
    queryFn: () => getMovieById(movieId),
  })

  useEffect(() => {
    if (!data) {
      router.replace('/+not-found')
    }
  }, [data, router])

  return {
    data,
    ...rest,
  }
}
