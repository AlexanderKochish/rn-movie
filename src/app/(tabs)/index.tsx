import MoviesRow from '@/src/features/bookmarks/components/MoviesRow/MoviesRow'
import { useTrendingMovies } from '@/src/features/movie/hooks/useTrandingMovies'
import CustomCarousel from '@/src/shared/components/CustomCarousel/CustomCarousel'
import { Colors } from '@/src/shared/styles/Colors'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function HomeScreen() {
  const { trending, isLoading } = useTrendingMovies()

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <CustomCarousel items={trending} />
        <View style={styles.row}>
          <MoviesRow
            isLoading={isLoading}
            items={trending}
            title="Top Trending Movies"
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  row: {
    flex: 1,
    marginTop: 30,
  },
})
