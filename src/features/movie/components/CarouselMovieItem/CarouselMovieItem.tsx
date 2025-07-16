import AppLogo from '@/src/shared/components/AppLogo/AppLogo'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Movie } from '@/src/shared/types/types'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

type Props = {
  item: Movie
}

const CarouselItem = ({ item }: Props) => {
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
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={[styles.gradient, { top: 0, height: 80 }]}
          />
          <AppLogo text="Watcher" />
          <View style={styles.detailsWrapper}>
            <Text
              variant="headlineSmall"
              style={{ color: Colors.dark.text, fontWeight: '700' }}
            >
              {item.title || item.original_title}
            </Text>
            <Text variant="bodyLarge" style={styles.overview}>
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
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={[styles.gradient, { bottom: 0, height: 100 }]}
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
    zIndex: 5,
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
    alignItems: 'center',
    gap: 10,
  },
  overview: {
    textAlign: 'center',
    color: Colors.dark.text,
    height: 75,
    marginBottom: 70,
  },
  playBtn: {
    backgroundColor: BaseColors.brown,
    position: 'absolute',
    bottom: 20,
    zIndex: 100,
  },
  label: {
    fontSize: 18,
    color: BaseColors.orangeLight,
  },
})
