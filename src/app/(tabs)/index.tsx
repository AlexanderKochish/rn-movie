import MovieRow from '@/src/features/movie/components/MovieRow/MovieRow'
import { getTrendigMovies } from '@/src/shared/api/moviedb.api'
import CustomCarousel from '@/src/shared/components/CustomCarousel/CustomCarousel'
import { Colors } from '@/src/shared/styles/Colors'
import { useQuery } from '@tanstack/react-query'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { data } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendigMovies,
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <CustomCarousel items={data?.results} />
        <ScrollView style={styles.row}>
          <MovieRow items={data?.results} title="Top Trending Movies" />
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
