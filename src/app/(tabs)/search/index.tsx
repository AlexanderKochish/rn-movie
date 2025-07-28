import MoviesList from '@/src/features/movie/components/MoviesList/MoviesList'
import { useMoviesByGenres } from '@/src/features/movie/hooks/useMoviesByGenres'
import { useSearchMovies } from '@/src/features/movie/hooks/useSearchMovies'
import GenresList from '@/src/features/search/components/GenresList/GenresList'
import SearchForm from '@/src/features/search/components/SearchForm/SearchForm'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchScreen = () => {
  const { movies, control } = useSearchMovies()
  const { handleGenre, genreIds, moviesByGenres } = useMoviesByGenres()
  const { theme } = useTheme()

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <SearchForm control={control} name="search" />
      <GenresList handleGenre={handleGenre} genreIds={genreIds} />

      <MoviesList items={movies?.results || moviesByGenres} />
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
})
