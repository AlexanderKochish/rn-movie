import MovieCard from '@/src/features/movie/components/MovieCard/MovieCard'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import NavigationItem from '@/src/shared/components/UI/NavigationItem/NavigationItem'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { MovieDetailsType } from '@/src/shared/types/types'
import { Href } from 'expo-router'
import React from 'react'
import { FlatList, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

type Props<T extends MovieDetailsType> = {
  movies: T[] | null
  title?: string
  icon?: string
  isLoading: boolean
  link?: Href
  isError?: any
}

const MoviesRow = <T extends MovieDetailsType>({
  movies,
  title,
  icon,
  isLoading,
  link,
  isError,
}: Props<T>) => {
  const { theme } = useTheme()
  return (
    <>
      <NavigationItem icon={icon} settingName={title} link={link} />
      {isLoading && (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={BaseColors.orange}
          />
        </View>
      )}
      {!isLoading && !movies?.length && (
        <Text
          variant="labelLarge"
          style={{
            color: Colors[theme].text,
            paddingVertical: 10,
          }}
        >
          List is empty
        </Text>
      )}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        style={{ flex: 1, height: 260 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </>
  )
}

export default MoviesRow
