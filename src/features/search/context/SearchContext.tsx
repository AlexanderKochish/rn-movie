import { Movie, MoviesResponse } from '@/src/shared/types/types'
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { createContext } from 'react'

export type SearchContextType = {
  movies?: Movie[]
  search: string
  isLoading: boolean
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<MoviesResponse, unknown>, Error>
  >
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
)
