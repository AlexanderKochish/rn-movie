import { useParam } from '@/src/shared/hooks/useParam'

export const useMovieId = () => {
  const movieId = useParam('movieId')
  const id = Number(movieId)
  if (!movieId || isNaN(id)) throw new Error('Missing or invalid movieId')
  return id
}
