import MovieCard from '@/src/features/movie/components/MovieCard/MovieCard'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { MovieUnionType } from '@/src/shared/types/types'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, Icon } from 'react-native-paper'

type Props<T extends MovieUnionType> = {
  items: T[] | undefined
  title?: string
  icon?: string
  isLoading: boolean
}

const MoviesRow = <T extends MovieUnionType>({
  items,
  title,
  icon,
  isLoading,
}: Props<T>) => {
  return (
    <View>
      <View style={styles.titleWrapper}>
        {icon && <Icon source={icon} size={24} color={Colors.dark.text} />}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      {isLoading && (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={BaseColors.orange}
          />
        </View>
      )}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            imageUrl={`${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`}
            title={item.title || item.original_title}
            vote_average={item.vote_average}
          />
        )}
      />
      {!items?.length && (
        <Text style={{ color: Colors.dark.text, paddingVertical: 10 }}>
          List is empty
        </Text>
      )}
    </View>
  )
}

export default MoviesRow

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
  },
})
