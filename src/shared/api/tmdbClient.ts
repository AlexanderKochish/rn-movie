import axios from 'axios'
import { Params } from '../types/types'

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
    config.params['language'] = 'en-US'

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

const handleError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new Error(error.message)
  }

  throw new Error('Unknown error')
}

export const fetchData = async <T>(
  url: string,
  params?: Params
): Promise<T> => {
  try {
    const { data, status } = await tmdb.get<T>(url, { params })

    if (status !== 200) {
      throw new Error('Some issues with getting movies')
    }

    return data
  } catch (error) {
    return handleError(error)
  }
}
