import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { Colors } from '@/src/shared/styles/Colors'
import CastAndCrew from '@/src/features/cast-and-crew/components/CastAndCrew/CastAndCrew'
import MovieDetails from '@/src/features/movie/components/MovieDetails/MovieDetails'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import Ratings from '@/src/features/rating/components/Ratings/Ratings'
import Reviews from '@/src/features/reviews/components/Reviews/Reviews'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { PaperProvider } from 'react-native-paper'

const MovieDetailsScreen = () => {
  const movieId = useMovieId()
  const { data, isLoading } = useMovieDetails(movieId)
  const { theme } = useTheme()

  if (isLoading || !data) {
    return <Preloader />
  }

  return (
    <PaperProvider>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          backgroundColor: Colors[theme].background,
        }}
      >
        <MovieDetails data={data} />
        <View style={{ paddingHorizontal: 15 }}>
          <Ratings
            voteAverage={data?.vote_average}
            voteCount={data?.vote_count}
          />
          <CastAndCrew />
          <Reviews />
        </View>
      </ScrollView>
    </PaperProvider>
  )
}

export default MovieDetailsScreen
