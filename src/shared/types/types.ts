export type Movie = {
  adult: boolean
  backdrop_path: string | null
  id: number
  title?: string
  name?: string
  original_language: string
  original_title?: string
  original_name?: string
  overview: string
  poster_path: string | null
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date?: string
  first_air_date?: string
  video?: boolean
  vote_average: number
  vote_count: number
}

export type MoviesResponse = {
  page: number
  results: MovieUnionType[]
  total_pages: number
  total_results: number
}

export type Genres = {
  id: number
  name: string
}

export type ProductionCompanies = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export type SpokenLanguages = {
  english_name: string
  iso_639_1: string
  name: string
}

export type ProductionCountries = {
  iso_3166_1: string
  name: string
}

export type MovieDetailsType = {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: string | null
  budget: number
  genres: Genres[]
  homepage: string | null
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompanies[]
  production_countries: ProductionCountries[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguages[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieCredits = {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export type CastMember = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type CrewMember = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

export type MovieUnionType = (Movie | MovieDetailsType) & { docId: string }

export type ReviewType = {
  id: string
  userId: string
  photoUrl: string | null
  displayName: string | null
  email: string
  rating: number | null
  review: string | null
  updatedAt: string
}

export type ThemeColorType = 'dark' | 'light'

export type PersonDetailsResponse = {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string | null
  deathday: string | null
  gender: number
  homepage: string | null
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string | null
}

export type Params = Record<string, string | number | boolean | undefined>

export type MovieCreditCommon = Omit<
  Movie,
  'media_type' | 'first_air_date' | 'original_name' | 'name'
>

export type MovieCastCredit = MovieCreditCommon & {
  character: string
  credit_id: string
  order: number
}

export type MovieCrewCredit = MovieCreditCommon & {
  credit_id: string
  department: string
  job: string
}

export type PersonMovieCreditsResponse = {
  cast: MovieCastCredit[]
  crew: MovieCrewCredit[]
}

export interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface VideosResponse {
  id: number
  results: Video[]
}
