import { useMoviesByCategory } from '@/src/features/movie/hooks/useMoviesByCategory'
import { MoviesCategories } from '@/src/features/movie/types/types'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Header from '@/src/shared/components/Header/Header'
import NewReleaseCard from '@/src/shared/components/NewReleaseCard/NewReleaseCard'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function WhatsNewScreen() {
  const { theme } = useTheme()
  const {
    selectedCategory,
    setSelectedCategory,
    data: movies,
    categories,
    isLoading,
    refetch,
    isRefetching,
  } = useMoviesByCategory()

  const onRefresh = () => refetch()

  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <Header goBack title="What's New" subTitle="Discover the latest movies" />

      <View style={styles.categoriesWrapper}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[
            styles.categoriesContainer,
            {
              backgroundColor: Colors[theme].stats,
              borderBottomColor: Colors[theme].border,
            },
          ]}
          contentContainerStyle={styles.categoriesContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryButton,
                { backgroundColor: Colors[theme].chip },
                selectedCategory === item.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(item.id as MoviesCategories)}
            >
              <Ionicons
                name={item.icon as ComponentProps<typeof Ionicons>['name']}
                size={20}
                color={
                  selectedCategory === item.id
                    ? BaseColors.white
                    : BaseColors.secondaryDark
                }
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.id && styles.categoryTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {isLoading && <Preloader />}
      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon="sad-outline"
              title="No movies found"
              description="Try another category"
            />
          ) : null
        }
        renderItem={({ item }) => <NewReleaseCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.moviesGrid}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  categoriesWrapper: {
    height: 65,
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    height: 40,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  moviesGrid: {
    padding: 16,
    gap: 20,
  },
})
