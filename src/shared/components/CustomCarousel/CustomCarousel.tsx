import CarouselItem from '@/src/features/movie/components/CarouselMovieItem/CarouselMovieItem'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'
import { BaseColors, Colors } from '../../styles/Colors'
import { Movie } from '../../types/types'

const SLIDER_WIDTH = Dimensions.get('window').width

type Props<T extends Movie> = {
  items?: T[]
}

const { width } = Dimensions.get('window')
const HERO_HEIGHT = width - 50 * 0.7

const CustomCarousel = <T extends Movie>({ items }: Props<T>) => {
  const progressValue = useSharedValue(0)
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
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress
        }}
        renderItem={({ item }: { item: Movie }) => <CarouselItem item={item} />}
      />

      {items && items.length > 0 && (
        <Pagination.Basic
          data={items.slice(0, 8)}
          progress={progressValue}
          activeDotStyle={styles.activeDot}
          dotStyle={styles.dots}
          containerStyle={styles.paginationContainer}
        />
      )}
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
  activeDot: {
    backgroundColor: Colors.dark.card,
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BaseColors.white,
    marginHorizontal: 4,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
  },
})
