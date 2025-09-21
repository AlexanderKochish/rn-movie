import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { MovieCardEntity } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import { useGenres } from '../../hooks/useGenres'

type MovieCardProps = {
  movie: MovieCardEntity
  size?: 'small' | 'medium' | 'large'
}

const { width } = Dimensions.get('window')
const POSTER_WIDTH = width / 3 - 20
const POSTER_HEIGHT = POSTER_WIDTH * 1.5

const MovieCard = ({ movie, size = 'medium' }: MovieCardProps) => {
  const { getGenreNames } = useGenres()
  const router = useRouter()
  const { theme } = useTheme()
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear() || 'TBA'
  }

  const sizes = {
    small: { width: POSTER_WIDTH, height: POSTER_HEIGHT },
    medium: { width: POSTER_WIDTH * 1.2, height: POSTER_HEIGHT * 1.2 },
    large: { width: POSTER_WIDTH * 1.5, height: POSTER_HEIGHT * 1.5 },
  }

  return (
    <TouchableOpacity
      style={[styles.card, { width: sizes[size].width }]}
      onPress={() =>
        router.push({
          pathname: '/(movie)/[movieId]',
          params: {
            movieId: movie.id,
          },
        })
      }
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: movie.poster_path
            ? `${process.env.EXPO_PUBLIC_IMG_W500}${movie.poster_path || movie.backdrop_path}`
            : process.env.EXPO_PUBLIC_POSTER_HOLDER,
        }}
        style={[
          styles.poster,
          { height: sizes[size].height, width: sizes[size].width },
        ]}
        resizeMode="cover"
      />
      <Text
        style={[styles.title, { color: Colors[theme].text }]}
        numberOfLines={2}
      >
        {movie.title}
      </Text>

      <View>
        <View style={styles.meta}>
          <View style={styles.rating}>
            <Ionicons name="star" style={{ color: BaseColors.yellow }} />
            <Text style={styles.ratingText}>
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>

          <Text style={styles.year}>
            {movie.release_date && formatDate(movie.release_date)}
          </Text>
        </View>

        {movie.genre_ids && (
          <Text style={styles.genres} numberOfLines={1}>
            {getGenreNames(movie.genre_ids)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  card: {
    width: POSTER_WIDTH,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  poster: {
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: BaseColors.yellow,
    fontSize: 12,
    fontWeight: '600',
  },
  year: {
    color: '#888',
    fontSize: 12,
  },
  genres: {
    color: '#666',
    fontSize: 11,
  },
})
