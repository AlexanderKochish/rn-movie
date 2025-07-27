import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { MovieUnionType } from '@/src/shared/types/types'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

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
          <View style={styles.detailsWrapper}>
            <Text
              variant="headlineSmall"
              style={{
                color: Colors[theme].title,
                fontWeight: '700',
                fontSize: 28,
              }}
            >
              {item.title || item.original_title}
            </Text>
            <Text
              variant="bodyLarge"
              style={[styles.overview, { color: Colors[theme].text }]}
            >
              {item.overview}
            </Text>
            <Button
              style={styles.playBtn}
              icon="play"
              mode="contained"
              labelStyle={styles.label}
            >
              Trailer
            </Button>
          </View>
          <LinearGradient
            colors={[
              'transparent',
              `${theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255, 255, 255, 0.95)'}`,
            ]}
            style={[styles.gradient, { bottom: 0, height: 250 }]}
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
  detailsWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    zIndex: 1,
  },
  overview: {
    textAlign: 'center',
    fontWeight: '600',
    height: 75,
    marginBottom: 70,
  },
  playBtn: {
    backgroundColor: BaseColors.brown,
    position: 'absolute',
    bottom: 10,
    zIndex: 100,
  },
  label: {
    fontSize: 18,
    color: BaseColors.orangeLight,
  },
})
