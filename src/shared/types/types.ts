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

export type MovieDetails = {
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

export type MovieUnionType = (Movie | MovieDetails) & { docId: string }
