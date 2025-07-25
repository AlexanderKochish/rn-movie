import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { Colors } from '@/src/shared/styles/Colors'

import CastAndCrew from '@/src/features/cast-and-crew/components/CastAndCrew/CastAndCrew'
import MovieDetails from '@/src/features/movie/components/MovieDetails/MovieDetails'
import Ratings from '@/src/features/rating/components/Ratings/Ratings'
import Reviews from '@/src/features/reviews/components/Reviews/Reviews'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { ActivityIndicator, PaperProvider } from 'react-native-paper'

const MovieDetailsScreen = () => {
  const [rating, setRating] = React.useState(0)
  const { movieId } = useLocalSearchParams()
  const { data, isLoading } = useMovieDetails(+movieId)

  if (isLoading) {
    return (
      <View
        style={[
          globalStyles.container,
          { backgroundColor: Colors.dark.background },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
          backgroundColor: Colors.dark.background,
        }}
      >
        <MovieDetails movieId={+movieId} data={data} />

        <Ratings
          voteAverage={data?.vote_average}
          voteCount={data?.vote_count}
        />
        <CastAndCrew movieId={+movieId} />

        <Reviews movieId={+movieId} rating={rating} />
      </ScrollView>
    </PaperProvider>
  )
}

export default MovieDetailsScreen
