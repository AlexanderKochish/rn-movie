import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { Movie } from '@/src/shared/types/types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import MovieCard from '../MovieCard/MovieCard'

type Props = {
  items: Movie[] | undefined
  title?: string
}

const MovieRow = ({ items, title }: Props) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            vote_average={item.vote_average}
            title={item.title || item.original_title}
            imageUrl={`${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`}
          />
        )}
      />
    </View>
  )
}

export default MovieRow

const styles = StyleSheet.create({
  title: {
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
  },
})
