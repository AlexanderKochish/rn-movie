import { useSearchContext } from '@/src/features/search/hooks/useSearchContext'
import NoMoreResults from '@/src/shared/components/NoMoreResults/NoMoreResults'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { Movie } from '@/src/shared/types/types'
import React, { useCallback } from 'react'
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native'
import MovieCard from '../MovieCard/MovieCard'

interface MoviesGridProps {
  movies?: Movie[]
  isLoading?: boolean
}

const { width } = Dimensions.get('window')
const NUM_COLUMNS = 3
const HORIZONTAL_GAP = 12
const VERTICAL_GAP = 16

const CARD_WIDTH = (width - HORIZONTAL_GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS

const MoviesGrid: React.FC<MoviesGridProps> = ({ movies, isLoading }) => {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = useSearchContext()
  const handleScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (
        isCloseToBottom(nativeEvent) &&
        !isLoading &&
        !isFetchingNextPage &&
        hasNextPage &&
        fetchNextPage
      ) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]
  )

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }: { item: Movie; index: number }) => {
        const isFirstInRow = index % NUM_COLUMNS === 0
        const isLastInRow = index % NUM_COLUMNS === NUM_COLUMNS - 1

        return (
          <View
            style={[
              styles.cardContainer,
              {
                marginLeft: isFirstInRow ? HORIZONTAL_GAP : HORIZONTAL_GAP / 2,
                marginRight: isLastInRow ? HORIZONTAL_GAP : HORIZONTAL_GAP / 2,
                marginBottom: VERTICAL_GAP,
              },
            ]}
          >
            <MovieCard movie={item} size="small" />
          </View>
        )
      }}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
      ListFooterComponent={
        <>
          {(isFetchingNextPage || isLoading) && (
            <View style={styles.footer}>
              <Preloader />
            </View>
          )}
          {!hasNextPage && !isLoading && movies && movies.length > 0 && (
            <View style={styles.footer}>
              <NoMoreResults />
            </View>
          )}
        </>
      }
    />
  )
}

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 50
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  )
}

export default MoviesGrid

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_GAP / 2,
    paddingTop: VERTICAL_GAP,
    paddingBottom: VERTICAL_GAP * 2,
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: VERTICAL_GAP * 2,
    marginTop: VERTICAL_GAP,
  },
})
