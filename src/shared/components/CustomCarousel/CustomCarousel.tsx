import CarouselItem from '@/src/features/movie/components/CarouselMovieItem/CarouselMovieItem'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'
import { BaseColors, Colors } from '../../styles/Colors'
import { Movie } from '../../types/types'
import AppLogo from '../AppLogo/AppLogo'

const SLIDER_WIDTH = Dimensions.get('window').width

type Props = {
  items?: Movie[]
}

const CustomCarousel = ({ items }: Props) => {
  const progressValue = useSharedValue(0)
  return (
    <View style={styles.wrapper}>
      <View style={styles.logoWrapper}>
        <AppLogo
          text="Watcher"
          size="small"
          variant="horizontal"
          color="orange"
        />
      </View>
      <Carousel
        testID={'xxx'}
        loop={true}
        width={SLIDER_WIDTH}
        height={500}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={2000}
        data={items?.slice(0, 8) || []}
        style={{ width: '100%' }}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress
        }}
        renderItem={({ item }: { item: Movie }) => <CarouselItem item={item} />}
      />

      <Pagination.Basic
        data={items?.slice(0, 8) || []}
        progress={progressValue}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dots}
        containerStyle={styles.paginationContainer}
      />
    </View>
  )
}

export default CustomCarousel

const styles = StyleSheet.create({
  wrapper: {
    height: 500,
    position: 'relative',
  },
  logoWrapper: {
    width: '100%',
    position: 'absolute',
    top: 35,
    zIndex: 50,
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: Colors.dark.background,
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BaseColors.gray,
    marginHorizontal: 4,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  },
})
