import { fetchData } from "@/src/shared/api/tmdbClient";
import { MovieCredits, PersonDetailsResponse } from "@/src/shared/types/types";
import { PersonMovieCreditsResponse } from "../../movie/types/types";

class Cast {
    getMovieCredits = (id: number) =>
        fetchData<MovieCredits>(`movie/${id}/credits`);

    getPersonDetailsById = (id: number) =>
        fetchData<PersonDetailsResponse>(`person/${id}`);

    getPersonMoviesCredit = (id: number) =>
        fetchData<PersonMovieCreditsResponse>(`person/${id}/movie_credits`);
}

export const castRepository = new Cast();
