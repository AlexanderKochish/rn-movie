import MoviesRow from '@/src/features/bookmarks/components/MoviesRow/MoviesRow'
import { useBookmark } from '@/src/features/bookmarks/hooks/useBookmark'
import React from 'react'

const BookmarkScreen = () => {
  const { items, isLoading } = useBookmark()

  return <MoviesRow movies={items} isLoading={isLoading} />
}

export default BookmarkScreen
