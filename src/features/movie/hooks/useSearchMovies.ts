import { getMoviesByName } from '@/src/shared/api/moviedb.api'
import { useDebounce } from '@/src/shared/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useSearchMovies = () => {
  const [search, setSearch] = useState('')
  const debounceValue = useDebounce(search)

  const { data: movies, ...rest } = useQuery({
    queryKey: ['searchMovies', debounceValue],
    queryFn: () => getMoviesByName(debounceValue),
    enabled: !!debounceValue.trim(),
  })

  return {
    movies,
    search,
    setSearch,
    ...rest,
  }
}
