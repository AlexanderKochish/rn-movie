import MoviesRow from '@/src/features/bookmarks/components/MoviesRow/MoviesRow'
import { useBookmark } from '@/src/features/movie/hooks/useBookmark'
import { useFavorite } from '@/src/features/movie/hooks/useFavorite'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const BookmarksScreen = () => {
  const { items, isLoading: isLoadingFavorite } = useFavorite()
  const { items: bookmarks, isLoading: isLoadingBookmark } = useBookmark()
  const { theme } = useTheme()
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <MoviesRow
        isLoading={isLoadingFavorite}
        items={items}
        icon="star-outline"
        title="Stars"
      />
      <MoviesRow
        isLoading={isLoadingBookmark}
        items={bookmarks}
        icon="bookmark-outline"
        title="Bookmark"
      />
    </SafeAreaView>
  )
}

export default BookmarksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
})
