// import MoviesRow from '@/src/features/bookmarks/components/MoviesRow/MoviesRow'
// import { useBookmark } from '@/src/features/movie/hooks/useBookmark'
// import { useFavorite } from '@/src/features/movie/hooks/useFavorite'
// import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
// import { Colors } from '@/src/shared/styles/Colors'
// import React from 'react'
// import { ScrollView, StyleSheet } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'

// const BookmarksScreen = () => {
//   const { items, isLoading: isLoadingFavorite } = useFavorite()
//   const { items: bookmarks, isLoading: isLoadingBookmark } = useBookmark()
//   const { theme } = useTheme()

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: Colors[theme].background }]}
//       edges={['top', 'left', 'right']}
//     >
//       <ScrollView>
//         <MoviesRow
//           isLoading={isLoadingFavorite}
//           items={items}
//           icon="star-outline"
//           title="Stars"
//           link={'/bookmarks/favorites'}
//         />

//         <MoviesRow
//           isLoading={isLoadingBookmark}
//           items={bookmarks}
//           icon="bookmark-outline"
//           title="Bookmark"
//           link={'/bookmarks/bookmark'}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default BookmarksScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 15,
//   },
// })

import BookmarksTabs from '@/src/features/bookmarks/components/BookmarksTabs/BookmarksTabs'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function BookmarksScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Library</Text>
          <Text style={styles.headerSubtitle}>Your personal collection</Text>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <BookmarksTabs />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#888',
    fontSize: 14,
  },
})
