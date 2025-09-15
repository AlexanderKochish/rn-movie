import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Movie } from '@/src/shared/types/types'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import MovieCard from '../MovieCard/MovieCard'

type Props = {
  movies: Movie[] | undefined
  title?: string
  onViewAll: () => void
}

const MovieRow = ({ title, movies, onViewAll }: Props) => {
  const { theme } = useTheme()
  return (
    <>
      {movies && movies.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
              {title}
            </Text>
            <TouchableOpacity onPress={onViewAll}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moviesScroll}
            data={movies}
            keyExtractor={(movie) => String(movie.id)}
            renderItem={(movie) => (
              <MovieCard movie={movie.item} size="small" />
            )}
          />
        </View>
      )}
    </>
  )
}

export default MovieRow

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  moviesScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
})
