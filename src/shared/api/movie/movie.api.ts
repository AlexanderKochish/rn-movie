import {
  MovieCredits,
  MovieDetailsType,
  MoviesResponse,
  VideosResponse,
} from "../../types/types";
import { fetchData } from "../tmdbClient";

export const getTrendigMovies = () =>
  fetchData<MoviesResponse>("trending/movie/day");

export const getPopularMovies = () =>
  fetchData<MoviesResponse>("movie/popular");

export const getTopRatedMovies = () =>
  fetchData<MoviesResponse>("movie/top_rated");

export const getUpcomingMovies = () =>
  fetchData<MoviesResponse>("movie/upcoming");

export const getNowPlayingMovies = () =>
  fetchData<MoviesResponse>("movie/now_playing");

export const getMovieById = (id: number) =>
  fetchData<MovieDetailsType>(`movie/${id}`);

export const getMovieCredits = (id: number) =>
  fetchData<MovieCredits>(`movie/${id}/credits`);

export const getMoviesByName = (search: string, page: number) =>
  fetchData<MoviesResponse>(`search/movie`, { query: search, page });

export const getTrailerVideoById = (id: number) =>
  fetchData<VideosResponse>(`movie/${id}/videos`);
