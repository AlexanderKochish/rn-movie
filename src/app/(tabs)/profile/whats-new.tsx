import { useGenres } from '@/src/features/genres/hooks/useGenres'
import { useMoviesByCategory } from '@/src/features/movie/hooks/useMoviesByCategory'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Header from '@/src/shared/components/Header/Header'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { Movie, MoviesCategories } from '@/src/shared/types/types'
import { formatDate } from '@/src/shared/utils/formatDate'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { ComponentProps } from 'react'
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function WhatsNewScreen() {
  const router = useRouter()
  const { getGenreNames } = useGenres()
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

  const navigateToMovieDetails = (movie: Movie) => {
    router.push({
      pathname: '/(movie)/[movieId]',
      params: {
        movieId: movie.id.toString(),
      },
    })
  }

  return (
    <View style={styles.container}>
      <Header goBack title="What's New" subTitle="Discover the latest movies" />

      <View style={styles.categoriesWrapper}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(item.id as MoviesCategories)}
            >
              <Ionicons
                name={item.icon as ComponentProps<typeof Ionicons>['name']}
                size={20}
                color={selectedCategory === item.id ? '#fff' : '#888'}
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
        renderItem={({ item }) => (
          <View key={item.id} style={styles.movieCard}>
            <View style={styles.posterContainer}>
              <Image
                source={{
                  uri: item.poster_path
                    ? `${process.env.EXPO_PUBLIC_IMG_W500}${item.poster_path || item.backdrop_path}`
                    : process.env.EXPO_PUBLIC_POSTER_HOLDER,
                }}
                style={styles.poster}
                resizeMode="cover"
              />

              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {item.vote_average.toFixed(1)}
                </Text>
              </View>

              <View style={styles.dateBadge}>
                <Text style={styles.dateText}>
                  {item.release_date && formatDate(item.release_date)}
                </Text>
              </View>
            </View>

            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {item.title}
              </Text>

              {item.genre_ids && (
                <Text style={styles.movieGenres} numberOfLines={1}>
                  {getGenreNames(item.genre_ids)}
                </Text>
              )}

              <Text style={styles.movieOverview} numberOfLines={3}>
                {item.overview}
              </Text>

              <TouchableOpacity
                onPress={() => navigateToMovieDetails(item)}
                style={styles.detailsButton}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
                <Ionicons name="chevron-forward" size={16} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.moviesGrid}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  categoriesWrapper: {
    height: 65,
  },
  categoriesContainer: {
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
  movieCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: 200,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  dateBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  movieInfo: {
    padding: 16,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieGenres: {
    color: '#007AFF',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  movieOverview: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  detailsButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
})
