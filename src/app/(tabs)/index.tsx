import MoviesRow from '@/src/features/bookmarks/components/MoviesRow/MoviesRow'
import { useTrendingMovies } from '@/src/features/movie/hooks/useTrandingMovies'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomCarousel from '@/src/shared/components/CustomCarousel/CustomCarousel'
import { Colors } from '@/src/shared/styles/Colors'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function HomeScreen() {
  const { trending, isLoading } = useTrendingMovies()
  const { theme } = useTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
  },
  row: {
    flex: 1,
    marginTop: 30,
  },
})
