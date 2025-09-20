import CarouselItem from '@/src/features/movie/components/CarouselMovieItem/CarouselMovieItem'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { Movie } from '../../types/types'

const SLIDER_WIDTH = Dimensions.get('window').width

type Props<T extends Movie> = {
  items?: T[]
}

const { width } = Dimensions.get('window')
const HERO_HEIGHT = width - 50 * 0.7

const CustomCarousel = <T extends Movie>({ items }: Props<T>) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { theme } = useTheme()
  return (
    <View style={styles.wrapper}>
      <Carousel
        testID={'xxx'}
        loop={true}
        width={SLIDER_WIDTH}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={10000}
        autoPlay={true}
        data={items?.slice(0, 8) || []}
        onProgressChange={(_, absProgress) =>
          setActiveIndex(Math.round(absProgress))
        }
        renderItem={({ item }: { item: Movie }) => <CarouselItem item={item} />}
      />

      <View style={styles.paginationContainer}>
        <View style={{ flexDirection: 'row' }}>
          {items &&
            items.length > 0 &&
            items
              .map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === activeIndex && styles.activeDot]}
                />
              ))
              .slice(0, 9)}
        </View>
      </View>
    </View>
  )
}

export default CustomCarousel

const styles = StyleSheet.create({
  wrapper: {
    height: HERO_HEIGHT,
    position: 'relative',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ff5a00',
    transform: [{ scale: 1.2 }],
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
  },
})
