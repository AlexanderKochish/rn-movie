import NotFoundScreen from '@/src/app/+not-found'
import MovieInfoCard from '@/src/features/movie/components/MovieInfoCard/MovieInfoCard'
import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import ReviewForm from '@/src/features/reviews/components/ReviewForm/ReviewForm'
import Reviews from '@/src/features/reviews/components/Reviews/Reviews'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'

const ReviewScreen = () => {
  const movieId = useMovieId()
  const { data: movie, refetch, isRefetching } = useMovieDetails(movieId)

  if (!movie || !movieId) {
    return <NotFoundScreen />
  }

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <MovieInfoCard movie={movie} />
      <ReviewForm movieId={movie?.id} />
      <Reviews />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
})

export default ReviewScreen
