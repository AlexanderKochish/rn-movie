import { useReview } from '@/src/features/reviews/hooks/useReview'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { MovieDetailsType } from '../../types/types'

type Props = {
  movie: MovieDetailsType
}

const MovieInfoCard = ({ movie }: Props) => {
  const { theme } = useTheme()
  const { reviews } = useReview(movie.id)

  return (
    <Animated.View
      style={[
        styles.movieInfo,
        {
          backgroundColor: Colors[theme].stats,
          borderColor: Colors[theme].border,
          borderWidth: theme === 'dark' ? 1 : 0,
        },
      ]}
      entering={FadeInDown.springify()}
    >
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
        <Text style={[styles.movieTitle, { color: Colors[theme].text }]}>
          {movie?.title}
        </Text>
        <View style={styles.ratingSummary}>
          <Ionicons name="star" size={20} color={BaseColors.yellow} />
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
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
