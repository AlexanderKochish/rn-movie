import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Icon, IconButton } from 'react-native-paper'
import { useBookmark } from '../../hooks/useBookmark'
import { useCredits } from '../../hooks/useCredits'
import { useFavorite } from '../../hooks/useFavorite'

import { MovieDetailsType } from '@/src/shared/types/types'

type Props = {
  movieId: number
  data: MovieDetailsType | undefined
}

const MovieDetails = ({ movieId, data }: Props) => {
  const router = useRouter()
  const {
    isItemToggled: isFavoriteToggled,
    toggleItem: toggleFavorite,
    isLoading: isLoadingFavorite,
  } = useFavorite()
  const {
    isItemToggled: isBookmarkToggled,
    toggleItem: toggleBookmark,
    isLoading: isLoadingBookmark,
  } = useBookmark()
  const isActiveFavorite = isFavoriteToggled(movieId)
  const isActiveBookmark = isBookmarkToggled(movieId)

  const { credits } = useCredits(movieId)
  const producer = useMemo(
    () => credits?.crew.find((item) => item.job === 'Producer'),
    [credits]
  )

  return (
    <>
      <View style={{ position: 'relative', height: 500 }}>
        <IconButton
          icon="arrow-left"
          iconColor="#fff"
          style={styles.backButton}
          onPress={() => router.back()}
        />
        <ImageBackground
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMG_W500}${data?.poster_path || data?.backdrop_path}`,
          }}
          style={styles.imageBackground}
        />
        <View style={styles.headerOverlay}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>
              {data?.original_title || data?.title}
            </Text>
            <View style={styles.btnsWrapper}>
              <Pressable
                onPress={() => toggleFavorite(data)}
                disabled={!data || isLoadingFavorite}
              >
                <Icon
                  source={isActiveFavorite ? 'star' : 'star-outline'}
                  size={24}
                  color={
                    isActiveFavorite ? BaseColors.yellow : BaseColors.white
                  }
                />
              </Pressable>
              <Pressable
                onPress={() => toggleBookmark(data)}
                disabled={!data || isLoadingBookmark}
              >
                <Icon
                  source={isActiveBookmark ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={
                    isActiveBookmark ? BaseColors.yellow : BaseColors.white
                  }
                />
              </Pressable>
            </View>
          </View>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={[styles.gradient, { height: 250 }]}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, { color: BaseColors.white }]}>
          2024 | Directed by
        </Text>
        <Text style={[styles.text, { color: BaseColors.orangeLight }]}>
          {producer?.name}
        </Text>
        <Text style={styles.overview}>{data?.overview}</Text>
      </View>
    </>
  )
}

export default MovieDetails

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 5,
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.dark.text,
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
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  overview: {
    color: Colors.dark.text,
    fontSize: 18,
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    gap: 10,
  },
  text: {
    color: Colors.dark.text,
  },
  btnsWrapper: {
    flexDirection: 'row',
    gap: 20,
  },
})
