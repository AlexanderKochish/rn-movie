import { fetchData } from "../../../shared/api/tmdbClient";
import { VideosResponse } from "../../../shared/types/types";
import {
  MovieDetailsType,
  MoviesCategories,
  MoviesResponse,
} from "../types/types";

class Movie {
  getTrendigMovies = () => fetchData<MoviesResponse>("trending/movie/day");

  getMoviesByCategory = async (category: MoviesCategories) =>
    fetchData<MoviesResponse>(`movie/${category}`);

  getMovieById = (id: number) => fetchData<MovieDetailsType>(`movie/${id}`);

  getMoviesByName = (search: string, page: number) =>
    fetchData<MoviesResponse>(`search/movie`, { query: search, page });

  getTrailerVideoById = (id: number) =>
    fetchData<VideosResponse>(`movie/${id}/videos`);
}

export const movieRepository = new Movie();
