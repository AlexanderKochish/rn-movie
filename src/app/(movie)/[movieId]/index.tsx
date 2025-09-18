import MovieDetailsActionBar from '@/src/features/movie/components/MovieDetailsActionBar/MovieDetailsActionBar'
import MovieDetailsTabs from '@/src/features/movie/components/MovieDetailsTabs/MovieDetailsTabs'
import MovieDetailsTitle from '@/src/features/movie/components/MovieDetailsTitle/MovieDetailsTitle'
import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function MovieDetailsScreen() {
  const router = useRouter()
  const movieId = useMovieId()

  const { data: movie, isLoading } = useMovieDetails(movieId)
  if (!movieId) {
    return null
  }
  if (isLoading || !movie) {
    return <Preloader />
  }

  if (!movieId) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="sad-outline" size={64} color="#666" />
        <Text style={styles.errorText}>Movie not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MovieDetailsTitle movieId={movieId} data={movie} />

      <MovieDetailsTabs movie={movie} />

      <MovieDetailsActionBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    gap: 20,
    padding: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
})
