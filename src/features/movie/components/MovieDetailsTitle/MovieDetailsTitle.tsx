import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import GoBackButton from '@/src/shared/components/GoBackButton/GoBackButton'
import IconToggleButton from '@/src/shared/components/UI/IconToggleButton/IconToggleButton'
import { Colors } from '@/src/shared/styles/Colors'
import { MovieDetailsType } from '@/src/shared/types/types'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useBookmark } from '../../hooks/useBookmark'
import { useFavorite } from '../../hooks/useFavorite'

type Props = {
  movieId: number
  data: MovieDetailsType | undefined
}

const MovieDetailsTitle = ({ movieId, data }: Props) => {
  const { theme } = useTheme()

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

  return (
    <View style={styles.wrapper}>
      <GoBackButton />
      <ImageBackground
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMG_W500}${data?.poster_path || data?.backdrop_path}`,
        }}
        style={styles.imageBackground}
      />
      <View style={styles.headerOverlay}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: Colors[theme].text }]}>
            {data?.original_title || data?.title}
          </Text>
          <View style={styles.btnsWrapper}>
            {data && (
              <IconToggleButton
                data={data}
                onPress={toggleFavorite}
                isLoading={isLoadingFavorite}
                isActive={isActiveFavorite}
                icon="star"
              />
            )}
            {data && (
              <IconToggleButton
                data={data}
                onPress={toggleBookmark}
                isLoading={isLoadingBookmark}
                isActive={isActiveBookmark}
                icon="bookmark"
              />
            )}
          </View>
        </View>
        <LinearGradient
          colors={[
            'transparent',
            `${theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255, 255, 255, 0.95)'}`,
          ]}
          style={[styles.gradient, { height: 250 }]}
        />
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
  btnsWrapper: {
    flexDirection: 'row',
    gap: 20,
  },
})
