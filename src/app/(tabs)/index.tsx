import MoviesRow from '@/src/features/bookmarks/components/MoviesRow/MoviesRow'
import { useHomeMovies } from '@/src/features/movie/hooks/useHomeMovies'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomCarousel from '@/src/shared/components/CustomCarousel/CustomCarousel'
import { Colors } from '@/src/shared/styles/Colors'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { nowPlaying, popular, topRated, trending, upcoming, isLoading } =
    useHomeMovies()
  const { theme } = useTheme()

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomCarousel items={trending} />
        <View style={styles.row}>
          <MoviesRow
            isLoading={isLoading}
            items={trending}
            title="Trending Movies Today"
          />
        </View>
        <View style={styles.row}>
          <MoviesRow
            isLoading={isLoading}
            items={popular}
            title="Popular Movies"
          />
        </View>
        <View style={styles.row}>
          <MoviesRow
            isLoading={isLoading}
            items={topRated}
            title="Top Rated Movies"
          />
        </View>
        <View style={styles.row}>
          <MoviesRow
            isLoading={isLoading}
            items={upcoming}
            title="Upcoming Soon"
          />
        </View>
        <View style={styles.row}>
          <MoviesRow
            isLoading={isLoading}
            items={nowPlaying}
            title="Now Playing"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20,
  },
})
