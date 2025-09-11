import { useSearchMovies } from '@/src/features/movie/hooks/useSearchMovies'
import SearchForm from '@/src/features/search/components/SearchForm/SearchForm'
import SearchTabs from '@/src/features/search/components/SearchTabs/SearchTabs'
import SearchProvider from '@/src/features/search/context/SearchProvider'
import Header from '@/src/shared/components/Header/Header'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function SearchScreen() {
  const {
    movies,
    search,
    reset,
    control,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchMovies()
  return (
    <SearchProvider
      value={{
        movies,
        search,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      }}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header title="Search Movies" subTitle="Find your next favorite film" />
        <View style={styles.searchContainer}>
          <SearchForm
            control={control}
            name="search"
            reset={reset}
            typingText={search}
          />
        </View>
        <SearchTabs />
      </View>
    </SearchProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
})
