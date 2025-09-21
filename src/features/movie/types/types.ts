import { Genres } from "../../genres/types/types";

export type Movie = {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    title?: string;
    name?: string;
    original_language: string;
    original_title?: string;
    original_name?: string;
    overview: string;
    poster_path: string | null;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date?: string;
    first_air_date?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
};

export type MoviesResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type MoviesCategories =
    | "popular"
    | "top_rated"
    | "upcoming"
    | "now_playing";

export type MovieCardEntity = {
    id: string | number;
    poster_path?: string | null;
    backdrop_path?: string | null;
    title: string;
    vote_average: number;
    release_date?: string;
    genre_ids?: number[];
};

export type MovieCreditCommon = Omit<
    Movie,
    "media_type" | "first_air_date" | "original_name" | "name"
>;

export type MovieCastCredit = MovieCreditCommon & {
    character: string;
    credit_id: string;
    order: number;
};

export type MovieCrewCredit = MovieCreditCommon & {
    credit_id: string;
    department: string;
    job: string;
};

export type PersonMovieCreditsResponse = {
    cast: MovieCastCredit[];
    crew: MovieCrewCredit[];
};

export type MovieUnionType = Movie | MovieDetailsType;

export type ProductionCompanies = {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
};

export type SpokenLanguages = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

export type ProductionCountries = {
    iso_3166_1: string;
    name: string;
};

export type MovieDetailsType = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: string | null;
    budget: number;
    genres: Genres[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompanies[];
    production_countries: ProductionCountries[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguages[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};
