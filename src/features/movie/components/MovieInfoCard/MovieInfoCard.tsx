import { useReview } from '@/src/features/reviews/hooks/useReview'
import { MovieDetailsType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

type Props = {
  movie: MovieDetailsType
}

const MovieInfoCard = ({ movie }: Props) => {
  const { reviews } = useReview(movie.id)

  return (
    <Animated.View style={styles.movieInfo} entering={FadeInDown.springify()}>
      <Image
        source={{
          uri:
            movie?.poster_path || movie?.backdrop_path
              ? `${process.env.EXPO_PUBLIC_IMG_W200}${movie.poster_path || movie.backdrop_path}`
              : process.env.EXPO_PUBLIC_POSTER_HOLDER,
        }}
        style={styles.moviePoster}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{movie?.title}</Text>
        <View style={styles.ratingSummary}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>
            {movie?.vote_average.toFixed(1)} • {reviews?.length} reviews
          </Text>
        </View>
      </View>
    </Animated.View>
  )
}

export default MovieInfoCard

const styles = StyleSheet.create({
  movieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  moviePoster: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#b0b0b0',
    marginLeft: 8,
    fontSize: 14,
  },
})
