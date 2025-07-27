import SearchItemCard from '@/src/features/movie/components/SearchItemCard/SearchItemCard'
import { useGenres } from '@/src/features/movie/hooks/useGenres'
import { useMoviesByGenres } from '@/src/features/movie/hooks/useMoviesByGenres'
import { useSearchMovies } from '@/src/features/movie/hooks/useSearchMovies'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchScreen = () => {
  const { genres } = useGenres()
  const { movies, search, setSearch } = useSearchMovies()
  const { handleGenre, moviesByGenres, genreIds, isLoading } =
    useMoviesByGenres()
  const { theme } = useTheme()

  if (isLoading) {
    return <Preloader />
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <TextInput
        value={search}
        onChangeText={(value) => setSearch(value)}
        style={{
          backgroundColor: Colors[theme].input,
          color: Colors[theme].text,
        }}
        left={
          <TextInput.Icon
            icon={'magnify'}
            size={24}
            color={theme === 'dark' ? Colors.dark.text : BaseColors.orange}
          />
        }
        placeholder="Search here..."
        placeholderTextColor={Colors[theme].text}
        textColor={Colors[theme].text}
      />
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGenres}
          horizontal
          data={genres?.genres}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Button
              onPress={() => handleGenre(item.id)}
              buttonColor={
                genreIds?.includes(item.id)
                  ? BaseColors.orange
                  : Colors[theme].chip
              }
              mode="contained"
              textColor={Colors[theme].text}
            >
              {item.name}
            </Button>
          )}
        />
      </View>
      <FlatList
        contentContainerStyle={{ gap: 10, padding: 0 }}
        showsVerticalScrollIndicator={false}
        data={movies?.results || moviesByGenres}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SearchItemCard
            title={item.title || item.original_title}
            source={`${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`}
            releaseYear={item.release_date || 'No release date'}
            voteAverage={item.vote_average}
            id={item.id}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  containerGenres: {
    columnGap: 10,
    paddingVertical: 15,
  },
})
