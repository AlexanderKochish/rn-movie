import { useSearchMovies } from '@/src/features/movie/hooks/useSearchMovies'
import SearchForm from '@/src/features/search/components/SearchForm/SearchForm'
import SearchTabs from '@/src/features/search/components/SearchTabs/SearchTabs'
import SearchProvider from '@/src/features/search/context/SearchProvider'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Header from '@/src/shared/components/Header/Header'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
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
  const { theme } = useTheme()
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
      <View
        style={[
          globalStyles.flex,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Header title="Search Movies" subTitle="Find your next favorite film" />
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: Colors[theme].emptyStateBackground },
            { borderBottomColor: '#333' },
          ]}
        >
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
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
})
