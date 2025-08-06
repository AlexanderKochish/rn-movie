import {
  MovieCredits,
  MovieDetailsType,
  MoviesResponse,
  VideosResponse,
} from '../../types/types'
import { fetchData } from '../tmdbClient'

export const getTrendigMovies = () =>
  fetchData<MoviesResponse>(`${process.env.EXPO_PUBLIC_TRENDING_URL!}`)

export const getMovieById = (id: number) =>
  fetchData<MovieDetailsType>(`movie/${id}`)

export const getMovieCredits = (id: number) =>
  fetchData<MovieCredits>(`movie/${id}/credits`)

export const getMoviesByName = (search: string) =>
  fetchData<MoviesResponse>(`search/movie`, { query: search })

export const getTrailerVideoById = (id: number) =>
  fetchData<VideosResponse>(`movie/${id}/videos`)
