import MoviesGrid from '@/src/features/movie/components/MoviesGrid/MoviesGrid'
import { useGenres } from '@/src/features/movie/hooks/useGenres'
import { useMoviesByGenres } from '@/src/features/movie/hooks/useMoviesByGenres'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const DiscoverTab = () => {
  const { genres } = useGenres()
  const {
    moviesByGenres: movies,
    isLoading: isLoadingByGenres,
    handleGenre,
    genreIds,
  } = useMoviesByGenres()
  return (
    <>
      <View style={styles.genresSection}>
        <Text style={styles.sectionTitle}>Select Genres</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genresContainer}
        >
          {genres?.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.genreChip,
                genreIds.includes(genre.id) && styles.genreChipActive,
              ]}
              onPress={() => handleGenre(genre.id)}
            >
              <Text
                style={[
                  styles.genreText,
                  genreIds.includes(genre.id) && styles.genreTextActive,
                ]}
              >
                {genre.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {genreIds.length === 0 && (
        <EmptyState
          icon="compass"
          title="Select genres to discover"
          description=" Choose one or more genres to find movies"
        />
      )}
      <MoviesGrid movies={movies} isLoading={isLoadingByGenres} />

      {/* {activeTab === 'discover' &&
        movies?.length === 0 &&
        !isLoadingByGenres && (
          <EmptyState icon="search" title="Not Found Results" />
        )} */}
    </>
  )
}

export default DiscoverTab

const styles = StyleSheet.create({
  genresSection: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  genresContainer: {
    gap: 8,
  },
  genreChip: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  genreChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  genreText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  genreTextActive: {
    color: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    color: '#888',
    fontSize: 16,
    marginTop: 16,
  },
})
