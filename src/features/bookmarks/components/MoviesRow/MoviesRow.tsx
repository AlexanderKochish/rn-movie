import MovieCard from '@/src/features/movie/components/MovieCard/MovieCard'
import { MovieDetailsType } from '@/src/features/movie/types/types'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

type Props<T extends MovieDetailsType> = {
  movies: T[] | null
  isLoading: boolean
  isError?: any
}

const MoviesRow = <T extends MovieDetailsType>({
  movies,
  isLoading,
  isError,
}: Props<T>) => {
  const { theme } = useTheme()
  return (
    <>
      {isLoading && (
        <View style={styles.container}>
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
        style={{ flex: 1, height: 300 }}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </>
  )
}

export default MoviesRow

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})
