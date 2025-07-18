import MovieRow from '@/src/features/movie/components/MovieRow/MovieRow'
import { useTrendingMovies } from '@/src/features/movie/hooks/useTrandingMovies'
import CustomCarousel from '@/src/shared/components/CustomCarousel/CustomCarousel'
import { Colors } from '@/src/shared/styles/Colors'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { trending } = useTrendingMovies()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <CustomCarousel items={trending} />
        <ScrollView style={styles.row}>
          <MovieRow items={trending} title="Top Trending Movies" />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
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
