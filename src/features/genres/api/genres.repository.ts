import { fetchData } from "@/src/shared/api/tmdbClient";
import { MoviesResponse } from "../../movie/types/types";
import { Genres } from "../types/types";

class Genre {
    getGenres = async () => {
        return await fetchData<{ genres: Genres[] }>(`genre/movie/list`);
    };

    getMoviesByGenre = async (genreIds: number[]) => {
        return await fetchData<MoviesResponse>(`discover/movie`, {
            with_genres: genreIds.join(","),
        });
    };
}

export const genresRepository = new Genre();
