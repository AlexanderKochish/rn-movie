import MoviesList from '@/src/features/movie/components/MoviesList/MoviesList'
import { useFavorite } from '@/src/features/movie/hooks/useFavorite'
import React from 'react'

const FavoritesMoviesScreen = () => {
  const { items } = useFavorite()

  return <MoviesList items={items} />
}

export default FavoritesMoviesScreen
