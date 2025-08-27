import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import PlayVideoButton from '@/src/shared/components/PlayVideoButton/PlayVideoButton'
import { Colors } from '@/src/shared/styles/Colors'
import { MovieUnionType } from '@/src/shared/types/types'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  item: MovieUnionType
}

const CarouselItem = ({ item }: Props) => {
  const { theme } = useTheme()

  return (
    <View style={{ position: 'relative' }}>
      <ImageBackground
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMG_W500}${item.poster_path || item.backdrop_path}`,
        }}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.contentWrapper}>
          <LinearGradient
            colors={[
              `${theme === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'}`,
              'transparent',
            ]}
            style={[
              styles.gradient,
              { top: 0, height: theme === 'dark' ? 100 : 80 },
            ]}
          />
          <View style={styles.detailsWrapper}>
            <Text
              variant="titleLarge"
              style={[
                styles.title,
                {
                  color: Colors[theme].title,
                },
              ]}
            >
              {item.title || item.original_title}
            </Text>
            <Text
              variant="titleMedium"
              style={[styles.overview, { color: Colors[theme].text }]}
            >
              {item.overview}
            </Text>
            <PlayVideoButton movieId={item?.id} />
          </View>
          <LinearGradient
            colors={[
              'transparent',
              `${theme === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'}`,
            ]}
            style={[
              styles.gradient,
              { bottom: 0, height: theme === 'dark' ? 250 : 200 },
            ]}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

export default CarouselItem

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  bgImage: {
    flex: 1,
    height: 500,
    position: 'relative',
  },
  contentWrapper: {
    height: 500,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center',
  },
  detailsWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    zIndex: 1,
  },
  overview: {
    textAlign: 'center',
    fontWeight: '600',
    height: 75,
    marginBottom: 40,
  },
})
