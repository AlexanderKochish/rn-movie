import MovieCard from '@/src/features/movie/components/MovieCard/MovieCard'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import NavigationItem from '@/src/shared/components/UI/NavigationItem/NavigationItem'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { MovieUnionType } from '@/src/shared/types/types'
import { Href } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

type Props<T extends MovieUnionType> = {
  items: T[] | undefined
  title?: string
  icon?: string
  isLoading: boolean
  link?: Href
}

const MoviesRow = <T extends MovieUnionType>({
  items,
  title,
  icon,
  isLoading,
  link,
}: Props<T>) => {
  const { theme } = useTheme()
  return (
    <View style={styles.container}>
      <NavigationItem icon={icon} settingName={title} link={link} />
      {!items && (
        <Text style={{ color: Colors[theme].text, paddingVertical: 10 }}>
          List is empty
        </Text>
      )}
      {isLoading && (
        <View style={{ flex: 1, height: 210 }}>
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
    </View>
  )
}

export default MoviesRow

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
