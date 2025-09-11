import { useFavorite } from '@/src/features/bookmarks/hooks/useFavorite'
import PlayVideoButton from '@/src/shared/components/PlayVideoButton/PlayVideoButton'
import IconToggleButton from '@/src/shared/components/UI/IconToggleButton/IconToggleButton'
import { MovieDetailsType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

type Props = {
  movieId: number
  data: MovieDetailsType | undefined
}

const { width } = Dimensions.get('window')
const BACKDROP_HEIGHT = width * 1

const MovieDetailsTitle = ({ movieId, data: movie }: Props) => {
  const router = useRouter()
  const {
    isItemToggled: isFavoriteToggled,
    toggleItem: toggleFavorite,
    isLoading: isLoadingFavorite,
  } = useFavorite()
  const isActiveFavorite = isFavoriteToggled(movieId)

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${movie?.title}" on MovieApp!`,
        url: `https://www.themoviedb.org/movie/${movieId}`,
      })
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <View style={styles.backdropContainer}>
      <Image
        source={{
          uri:
            movie?.backdrop_path || movie?.poster_path
              ? `${process.env.EXPO_PUBLIC_IMG_ORIGINAL}${movie?.backdrop_path || movie?.poster_path}`
              : process.env.EXPO_PUBLIC_POSTER_HOLDER,
        }}
        style={styles.backdropImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
        style={styles.backdropGradient}
      />

      {/* Header Actions */}
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social" size={20} color="#fff" />
          </TouchableOpacity>

          {movie && (
            <IconToggleButton
              data={movie}
              onPress={() => toggleFavorite(movie)}
              isLoading={isLoadingFavorite}
              isActive={isActiveFavorite}
              icon="heart"
            />
          )}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              router.push({
                pathname: '/(movie)/[movieId]/reviews',
                params: {
                  movieId: String(movie?.id),
                },
              })
            }
          >
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.posterSection}>
        <Image
          source={{
            uri:
              movie?.poster_path || movie?.backdrop_path
                ? `${process.env.EXPO_PUBLIC_IMG_W500}${movie?.poster_path || movie?.backdrop_path}`
                : process.env.EXPO_PUBLIC_POSTER_HOLDER,
          }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.basicInfo}>
          <Text style={styles.title}>{movie?.title}</Text>
          {movie?.tagline && (
            <Text style={styles.tagline}>{movie.tagline}</Text>
          )}

          <View style={styles.metaInfo}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>
                {movie?.vote_average.toFixed(1)} (
                {movie?.vote_count.toLocaleString()})
              </Text>
            </View>

            <Text style={styles.year}>
              {movie && getYear(movie?.release_date)}
            </Text>

            {movie && movie.runtime > 0 && (
              <Text style={styles.runtime}>
                {formatRuntime(movie?.runtime)}
              </Text>
            )}
          </View>

          <PlayVideoButton movieId={movieId} />
        </View>
      </View>
    </View>
  )
}

export default MovieDetailsTitle

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    height: 500,
  },

  backButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backdropContainer: {
    height: BACKDROP_HEIGHT,
  },
  backdropImage: {
    width: '100%',
    height: '100%',
  },
  backdropGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },

  headerActions: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 12,
  },
  posterSection: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
  },
  basicInfo: {
    flex: 1,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tagline: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  year: {
    color: '#888',
    fontSize: 14,
  },
  runtime: {
    color: '#888',
    fontSize: 14,
  },

  imageBackground: {
    height: 500,
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    zIndex: 15,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  btnsWrapper: {
    flexDirection: 'row',
    gap: 20,
  },
})
