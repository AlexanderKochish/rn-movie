import {
  MovieCredits,
  MovieDetailsType,
  MoviesCategories,
  MoviesResponse,
  VideosResponse,
} from "../../types/types";
import { fetchData } from "../tmdbClient";

export const getTrendigMovies = () =>
  fetchData<MoviesResponse>("trending/movie/day");

export const getMoviesByCategory = async (category: MoviesCategories) =>
  fetchData<MoviesResponse>(`movie/${category}`);

export const getMovieById = (id: number) =>
  fetchData<MovieDetailsType>(`movie/${id}`);

export const getMovieCredits = (id: number) =>
  fetchData<MovieCredits>(`movie/${id}/credits`);

export const getMoviesByName = (search: string, page: number) =>
  fetchData<MoviesResponse>(`search/movie`, { query: search, page });

export const getTrailerVideoById = (id: number) =>
  fetchData<VideosResponse>(`movie/${id}/videos`);
