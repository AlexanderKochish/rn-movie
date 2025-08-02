import {
  PersonDetailsResponse,
  PersonMovieCreditsResponse,
} from '../../types/types'
import { fetchData } from '../tmdbClient'

export const getPersonDetailsById = (id: number) =>
  fetchData<PersonDetailsResponse>(`person/${id}`)

export const getPersonMoviesCredit = (id: number) =>
  fetchData<PersonMovieCreditsResponse>(`person/${id}/movie_credits`)
