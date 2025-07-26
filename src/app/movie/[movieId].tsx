import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { Colors } from '@/src/shared/styles/Colors'

import CastAndCrew from '@/src/features/cast-and-crew/components/CastAndCrew/CastAndCrew'
import MovieDetails from '@/src/features/movie/components/MovieDetails/MovieDetails'
import Ratings from '@/src/features/rating/components/Ratings/Ratings'
import Reviews from '@/src/features/reviews/components/Reviews/Reviews'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView } from 'react-native'
import { PaperProvider } from 'react-native-paper'

const MovieDetailsScreen = () => {
  const [rating, setRating] = React.useState(0)
  const { movieId } = useLocalSearchParams()
  const { data, isLoading } = useMovieDetails(+movieId)

  if (isLoading) {
    return <Preloader />
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
          movieId={+movieId}
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
