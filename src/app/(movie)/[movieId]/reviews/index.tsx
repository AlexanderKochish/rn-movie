import NotFoundScreen from '@/src/app/+not-found'
import MovieInfoCard from '@/src/features/movie/components/MovieInfoCard/MovieInfoCard'
import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import ReviewForm from '@/src/features/reviews/components/ReviewForm/ReviewForm'
import Reviews from '@/src/features/reviews/components/Reviews/Reviews'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import React from 'react'
import { ScrollView } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const ReviewScreen = () => {
  const movieId = useMovieId()
  const { theme } = useTheme()
  const { data: movie, refetch, isRefetching } = useMovieDetails(movieId)

  if (!movie || !movieId) {
    return <NotFoundScreen />
  }

  return (
    <SafeAreaView
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
      edges={['bottom']}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <MovieInfoCard movie={movie} />
        <ReviewForm movieId={movie?.id} />
        <Reviews />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReviewScreen
