import { MovieDetailsType } from '@/src/shared/types/types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

type Props = {
  movie: MovieDetailsType
}

const MovieOverview = ({ movie }: Props) => {
  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.tabContent}>
      <Text style={styles.overview}>{movie.overview}</Text>

      {movie.genres && movie.genres.length > 0 && (
        <View style={styles.genres}>
          {movie.genres.map((genre) => (
            <View key={genre.id} style={styles.genreChip}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  )
}

export default MovieOverview

const styles = StyleSheet.create({
  tabContent: {
    marginBottom: 20,
  },
  overview: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreChip: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
  },
  genreText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '500',
  },
})
