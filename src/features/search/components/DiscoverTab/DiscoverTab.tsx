import { useMoviesByGenres } from '@/src/features/genres/hooks/useMoviesByGenres'
import MoviesGrid from '@/src/features/movie/components/MoviesGrid/MoviesGrid'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import GenresList from '../../../genres/components/GenresList/GenresList'

const DiscoverTab = () => {
  const {
    moviesByGenres: movies,
    isLoading: isLoadingByGenres,
    handleGenre,
    genreIds,
  } = useMoviesByGenres()
  return (
    <>
      <GenresList handleGenre={handleGenre} genreIds={genreIds} />
      <View style={styles.contentContainer}>
        {genreIds.length === 0 && (
          <EmptyState
            icon="compass"
            title="Select genres to discover"
            description=" Choose one or more genres to find movies"
          />
        )}

        {genreIds.length > 0 && !isLoadingByGenres && movies?.length === 0 && (
          <EmptyState icon="search" title="Not Found Results" />
        )}
      </View>
      <MoviesGrid movies={movies} isLoading={isLoadingByGenres} />
    </>
  )
}

export default DiscoverTab

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
})
