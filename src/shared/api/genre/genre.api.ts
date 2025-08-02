import { Genres, MoviesResponse } from '../../types/types'
import { fetchData } from '../tmdbClient'

export const getGenres = async () => {
  return await fetchData<{ genres: Genres[] }>(`genre/movie/list`)
}

export const getMoviesByGenre = async (genreIds: number[]) => {
  return await fetchData<MoviesResponse>(`discover/movie`, {
    with_genres: genreIds.join(','),
  })
}
