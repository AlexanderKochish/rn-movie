import MovieDetailsActionBar from '@/src/features/movie/components/MovieDetailsActionBar/MovieDetailsActionBar'
import MovieDetailsTabs from '@/src/features/movie/components/MovieDetailsTabs/MovieDetailsTabs'
import MovieDetailsTitle from '@/src/features/movie/components/MovieDetailsTitle/MovieDetailsTitle'
import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function MovieDetailsScreen() {
  const router = useRouter()
  const movieId = useMovieId()
  const { theme } = useTheme()

  const { data: movie, isLoading } = useMovieDetails(movieId)

  if (isLoading || !movie) {
    return <Preloader />
  }

  if (!movieId) {
    return (
      <EmptyState icon="sad-outline" title="Movie not found">
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </EmptyState>
    )
  }

  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <MovieDetailsTitle movieId={movieId} data={movie} />

      <MovieDetailsTabs movie={movie} />

      <MovieDetailsActionBar />
    </View>
  )
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: BaseColors.blueDark,
    fontSize: 16,
    fontWeight: '600',
  },
})
