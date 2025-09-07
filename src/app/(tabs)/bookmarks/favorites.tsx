import MoviesRow from '@/src/features/bookmarks/components/MoviesRow/MoviesRow'
import { useFavorite } from '@/src/features/bookmarks/hooks/useFavorite'

import React from 'react'

const FavoritesMoviesScreen = () => {
  const { items, isLoading } = useFavorite()

  return <MoviesRow movies={items} isLoading={isLoading} />
}

export default FavoritesMoviesScreen
