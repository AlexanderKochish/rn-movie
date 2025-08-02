import { getMoviesByName } from '@/src/shared/api'
import { useDebounce } from '@/src/shared/hooks/useDebounce'
import { MoviesResponse } from '@/src/shared/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
  searchSchema,
  searchSchemaType,
} from '../../search/lib/zod/search.schema'

export const useSearchMovies = () => {
  const { control, watch } = useForm<searchSchemaType>({
    defaultValues: {
      search: '',
    },
    resolver: zodResolver(searchSchema),
  })
  const search = watch('search')
  const debounceValue = useDebounce(search)

  const { data: movies, ...rest } = useQuery<MoviesResponse, Error>({
    queryKey: ['searchMovies', debounceValue],
    queryFn: () => getMoviesByName(debounceValue),
    enabled: !!debounceValue.trim(),
    retry: false,
  })

  return {
    movies,
    control,
    ...rest,
  }
}
