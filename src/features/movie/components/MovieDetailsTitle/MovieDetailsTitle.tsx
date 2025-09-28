import { useFavorite } from '@/src/features/bookmarks/hooks/useFavorite'
import PlayVideoButton from '@/src/shared/components/PlayVideoButton/PlayVideoButton'
import IconToggleButton from '@/src/shared/components/UI/IconToggleButton/IconToggleButton'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import * as FileSystem from 'expo-file-system'
import React from 'react'
import {
  Alert,
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { IconButton } from 'react-native-paper'
import { MovieDetailsType } from '../../types/types'

type Props = {
  movieId: number
  data: MovieDetailsType | undefined
}

const { width } = Dimensions.get('window')
const BACKDROP_HEIGHT = width * 1

const MovieDetailsTitle = ({ movieId, data: movie }: Props) => {
  const { theme, getThemeGradient } = useTheme()
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
      const imageUrl = `${process.env.EXPO_PUBLIC_IMG_W500}${movie?.poster_path || movie?.backdrop_path}`
      const fileUri = `${FileSystem.documentDirectory}${movieId}.jpg`

      const { uri: localUri } = await FileSystem.downloadAsync(
        imageUrl,
        fileUri
      )

      const description =
        `🎥 ${movie?.title}\n` +
        `⭐ Rating: ${movie?.vote_average}/10\n\n` +
        `${movie?.overview?.substring(0, 120)}...\n\n` +
        `Watch in the app: rnmovieapp://${movie?.id}`

      await Share.share({
        message: description,
        url: localUri,
        title: `Share ${movie?.title}`,
      })
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      }
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
        colors={['transparent', ...getThemeGradient(theme)]}
        style={styles.backdropGradient}
      />

      <View style={styles.headerActions}>
        <IconButton
          onPress={() => router.back()}
          icon={'arrow-left'}
          iconColor={Colors[theme].text}
          size={24}
          contentStyle={styles.backButton}
          containerColor={Colors[theme].actionBtn}
        />

        <View style={styles.rightActions}>
          <IconButton
            contentStyle={styles.actionButton}
            icon={'share-outline'}
            size={24}
            iconColor={Colors[theme].text}
            containerColor={Colors[theme].actionBtn}
            onPress={handleShare}
          />

          {movie && (
            <IconToggleButton
              data={movie}
              onPress={() => toggleFavorite(movie)}
              isLoading={isLoadingFavorite}
              isActive={isActiveFavorite}
              icon="heart"
            />
          )}

          <IconButton
            contentStyle={styles.actionButton}
            icon={'chat-outline'}
            size={24}
            iconColor={Colors[theme].text}
            containerColor={Colors[theme].actionBtn}
            onPress={() =>
              router.push({
                pathname: '/(movie)/[movieId]/reviews',
                params: {
                  movieId: String(movie?.id),
                },
              })
            }
          />
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
            <Text style={[styles.tagline, { color: Colors[theme].text }]}>
              {movie.tagline}
            </Text>
          )}

          <View style={styles.metaInfo}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color={BaseColors.yellow} />
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

          <PlayVideoButton size="small" movieId={movieId} />
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
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: BaseColors.blueDark,
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
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
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
