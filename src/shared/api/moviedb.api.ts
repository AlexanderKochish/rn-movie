import axios from 'axios'
import { MovieCredits, MovieDetails, MoviesResponse } from '../types/types'

const tmdb = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

tmdb.interceptors.request.use(
  async (config) => {
    if (!config.params) {
      config.params = {}
    }

    config.params['api_key'] = process.env.EXPO_PUBLIC_API_KEY

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export const getTrendigMovies = async () => {
  try {
    const { data, status } = await tmdb.get<MoviesResponse>(
      `${process.env.EXPO_PUBLIC_TRENDING_URL!}`,
      { params: { language: 'en-US' } }
    )

    if (status !== 200) {
      throw new Error('Some issues with getting movies')
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getMovieById = async (id: number) => {
  try {
    const { data, status } = await tmdb.get<MovieDetails>(`movie/${id}`, {
      params: { language: 'en-US' },
    })

    if (status !== 200) {
      throw new Error('Some issues with getting movies')
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getMovieCredits = async (id: number) => {
  try {
    const { data, status } = await tmdb.get<MovieCredits>(
      `movie/${id}/credits`,
      {
        params: { language: 'en-US' },
      }
    )

    if (status !== 200) {
      throw new Error('Some issues with getting movies')
    }

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
