import MoviesList from '@/src/features/movie/components/MoviesList/MoviesList'
import { useBookmark } from '@/src/features/movie/hooks/useBookmark'
import React from 'react'

const BookmarkScreen = () => {
  const { items } = useBookmark()

  return <MoviesList items={items} />
}

export default BookmarkScreen
