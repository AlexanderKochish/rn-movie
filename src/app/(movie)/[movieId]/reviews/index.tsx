import NotFoundScreen from '@/src/app/+not-found'
import MovieInfoCard from '@/src/features/movie/components/MovieInfoCard/MovieInfoCard'
import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import ReviewForm from '@/src/features/reviews/components/ReviewForm/ReviewForm'
import Reviews from '@/src/features/reviews/components/Reviews/Reviews'
import { useReview } from '@/src/features/reviews/hooks/useReview'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'

const ReviewScreen = () => {
  const movieId = useMovieId()
  const { data: movie, refetch: refetchMovie } = useMovieDetails(movieId)
  const { refetch: refetchReviews } = useReview(movieId)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    const refreshPromises = [refetchMovie(), refetchReviews()]

    Promise.all(refreshPromises)
      .then(() => {
        setRefreshing(false)
      })
      .catch(() => {
        setRefreshing(false)
      })
  }, [refetchMovie, refetchReviews])

  if (!movie) {
    return <NotFoundScreen />
  }

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
