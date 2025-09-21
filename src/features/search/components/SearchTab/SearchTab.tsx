import MoviesGrid from '@/src/features/movie/components/MoviesGrid/MoviesGrid'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSearchContext } from '../../hooks/useSearchContext'

const SearchTab = () => {
  const { movies, search, isLoading, hasNextPage } = useSearchContext()
  return (
    <>
      <View style={styles.contentContainer}>
        {!hasNextPage && !isLoading && search.length === 0 && (
          <EmptyState
            icon="search"
            title="Try to Search"
            description="Find your first film"
          />
        )}
        {search.length > 2 && movies && movies.length === 0 && !isLoading && (
          <EmptyState
            icon="search"
            title="No results found"
            description="Try different keywords or check your spelling"
          />
        )}
      </View>
      <MoviesGrid movies={movies} isLoading={isLoading} />
    </>
  )
}

export default SearchTab

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
})
