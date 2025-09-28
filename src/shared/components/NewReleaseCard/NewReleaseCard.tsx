import { useGenres } from '@/src/features/genres/hooks/useGenres'
import { Movie } from '@/src/features/movie/types/types'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BaseColors, Colors } from '../../styles/Colors'
import { formatDate } from '../../utils/formatDate'

interface Props {
  item: Movie
}

const NewReleaseCard = ({ item }: Props) => {
  const router = useRouter()
  const { theme } = useTheme()
  const { getGenreNames } = useGenres()
  const navigateToMovieDetails = (movie: Movie) => {
    router.push({
      pathname: '/(movie)/[movieId]',
      params: {
        movieId: movie.id.toString(),
      },
    })
  }

  return (
    <View
      key={item.id}
      style={[styles.movieCard, { backgroundColor: Colors[theme].stats }]}
    >
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: item.poster_path
              ? `${process.env.EXPO_PUBLIC_IMG_W500}${item.poster_path || item.backdrop_path}`
              : process.env.EXPO_PUBLIC_POSTER_HOLDER,
          }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={BaseColors.yellow} />
          <Text style={styles.ratingText}>{item.vote_average.toFixed(1)}</Text>
        </View>

        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>
            {item.release_date && formatDate(item.release_date)}
          </Text>
        </View>
      </View>

      <View style={styles.movieInfo}>
        <Text
          style={[styles.movieTitle, { color: Colors[theme].text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        {item.genre_ids && (
          <Text style={styles.movieGenres} numberOfLines={1}>
            {getGenreNames(item.genre_ids)}
          </Text>
        )}

        <Text style={styles.movieOverview} numberOfLines={3}>
          {item.overview}
        </Text>

        <TouchableOpacity
          onPress={() => navigateToMovieDetails(item)}
          style={styles.detailsButton}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={BaseColors.blueDark}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NewReleaseCard

const styles = StyleSheet.create({
  movieCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: 200,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  dateBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  movieInfo: {
    padding: 16,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieGenres: {
    color: '#007AFF',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  movieOverview: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  detailsButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
})
