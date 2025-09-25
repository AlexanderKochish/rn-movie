export type MovieCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export type ReviewType = {
  id: string;
  user_id: string;
  movie_id: number;
  review: string | null;
  rating: number | null;
  created_at: string;
  username: string;
  email: string;
  avatar_url: string | null;
};

export type ThemeColorType = "dark" | "light";

export type PersonDetailsResponse = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
};

export type Params = Record<string, string | number | boolean | undefined>;

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export type TermsOfServiceType = {
  id: string;
  title: string;
  description: string;
};
