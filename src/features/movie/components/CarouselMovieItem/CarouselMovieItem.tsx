import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Movie, ThemeColorType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'
import {
  Animated,
  ColorValue,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  item: Movie
}

const { width } = Dimensions.get('window')
const HERO_HEIGHT = width - 50 * 0.7

const CarouselItem = ({ item }: Props) => {
  const { theme } = useTheme()
  const router = useRouter()
  const scrollY = useRef(new Animated.Value(0)).current
  const heroScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  })

  const getThemeGradient = (
    theme: ThemeColorType
  ): [ColorValue, ColorValue, ...ColorValue[]] => {
    switch (theme) {
      case 'light':
        return [
          'transparent',
          'rgba(255, 255, 255, 0.7)',
          'rgba(255, 255, 255, 0.9)',
        ]
      case 'dark':
        return ['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']
      default:
        return ['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']
    }
  }

  const navigateToMovie = (movie: Movie) => {
    router.push({
      pathname: '/(movie)/[movieId]',
      params: {
        movieId: movie.id.toString(),
      },
    })
  }

  return (
    <Animated.View
      style={[styles.heroSection, { transform: [{ scale: heroScale }] }]}
    >
      <Image
        source={{
          uri:
            item.backdrop_path || item.poster_path
              ? `${process.env.EXPO_PUBLIC_IMG_ORIGINAL}${item.backdrop_path || item.poster_path}`
              : process.env.EXPO_PUBLIC_POSTER_HOLDER,
        }}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={getThemeGradient(theme)}
        style={styles.heroGradient}
      />

      <View style={styles.heroContent}>
        <Text style={styles.heroBadge}>🎬 Featured Today</Text>
        <Text style={[styles.heroTitle, { color: Colors[theme].text }]}>
          {item.title}
        </Text>
        <Text
          style={[styles.heroOverview, { color: Colors[theme].text }]}
          numberOfLines={2}
        >
          {item.overview}
        </Text>

        <View style={styles.heroActions}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigateToMovie(item)}
          >
            <Ionicons name="play" size={20} color="#fff" />
            <Text style={styles.playButtonText}>Watch Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/(movie)/[movieId]',
                params: {
                  movieId: item.id,
                },
              })
            }
            style={styles.infoButton}
          >
            <Ionicons name="information" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

export default CarouselItem

const styles = StyleSheet.create({
  heroSection: {
    height: HERO_HEIGHT,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  heroBadge: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroOverview: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
})
