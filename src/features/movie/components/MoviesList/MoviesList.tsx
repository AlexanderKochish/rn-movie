import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { MovieUnionType } from '@/src/shared/types/types'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import SearchItemCard from '../SearchItemCard/SearchItemCard'

type Props = {
  items: MovieUnionType[] | undefined
}

const MoviesList = ({ items }: Props) => {
  const { theme } = useTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <FlatList
        contentContainerStyle={{
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SearchItemCard
            id={item.id}
            releaseYear={item.release_date}
            title={item.title || item.original_title}
            source={`${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`}
            voteAverage={item.vote_average}
          />
        )}
      />
    </View>
  )
}

export default MoviesList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
})
