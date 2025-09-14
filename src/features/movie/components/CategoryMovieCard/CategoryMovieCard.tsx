import { Movie } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
const { width } = Dimensions.get('window')
const POSTER_WIDTH = width * 0.4
const POSTER_HEIGHT = POSTER_WIDTH * 1.5

type Props = {
  movie: Movie
  index: number
}
const CategoryMovieCard = ({ movie, index }: Props) => {
  const router = useRouter()
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/(movie)/[movieId]',
          params: {
            movieId: movie.id,
          },
        })
      }
      style={[styles.movieCard, { marginLeft: index % 2 === 0 ? 0 : 10 }]}
      activeOpacity={0.8}
    >
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        />

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>
            {movie.vote_average?.toFixed(1)}
          </Text>
        </View>
      </View>

      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.movieYear}>
          {movie.release_date?.split('-')[0]}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CategoryMovieCard

const styles = StyleSheet.create({
  movieCard: {
    width: POSTER_WIDTH,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  posterContainer: {
    width: '100%',
    height: POSTER_HEIGHT,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  ratingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  movieInfo: {
    padding: 12,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
  },
  movieYear: {
    color: '#64b5f6',
    fontSize: 12,
    opacity: 0.8,
  },
})
