import MoviesRow from '@/src/features/bookmarks/components/MoviesRow/MoviesRow'
import { useBookmark } from '@/src/features/movie/hooks/useBookmark'
import { useFavorite } from '@/src/features/movie/hooks/useFavorite'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

const BookmarksScreen = () => {
  const { items, isLoading: isLoadingFavorite } = useFavorite()
  const { items: bookmarks, isLoading: isLoadingBookmark } = useBookmark()
  const { theme } = useTheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <MoviesRow
        isLoading={isLoadingFavorite}
        items={items}
        icon="star-outline"
        title="Stars"
        link={'/bookmarks/favorites'}
      />

      <MoviesRow
        isLoading={isLoadingBookmark}
        items={bookmarks}
        icon="bookmark-outline"
        title="Bookmark"
        link={'/bookmarks/bookmark'}
      />
    </ScrollView>
  )
}

export default BookmarksScreen

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
})
