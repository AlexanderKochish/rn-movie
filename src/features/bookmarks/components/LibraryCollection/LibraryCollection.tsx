import { MovieDetailsType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import { UseMutateFunction } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const { width } = Dimensions.get('window')
const POSTER_WIDTH = width / 3 - 20
const POSTER_HEIGHT = POSTER_WIDTH * 1.5

type Props = {
  collection: MovieDetailsType[]
  activeTab: 'rated' | 'favorites' | 'watchlist'
  isLoading: boolean
  toggleItem: UseMutateFunction<
    void,
    unknown,
    MovieDetailsType | undefined,
    unknown
  >
}

const LibraryCollection = ({
  collection,
  activeTab,
  isLoading,
  toggleItem,
}: Props) => {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getEmptyStateConfig = () => {
    switch (activeTab) {
      case 'favorites':
        return {
          icon: 'heart',
          title: 'No favorites yet',
          subtitle: 'Movies you love will appear here',
        }
      case 'rated':
        return {
          icon: 'star',
          title: 'No rated movies',
          subtitle: 'Rate movies to see them here',
        }
      case 'watchlist':
        return {
          icon: 'bookmark',
          title: 'Watchlist is empty',
          subtitle: 'Add movies to watch later',
        }
      default:
        return {
          icon: 'heart',
          title: 'No items',
          subtitle: 'Add items to see them here',
        }
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading your bookmarks...</Text>
      </View>
    )
  }

  const emptyState = getEmptyStateConfig()
  return (
    <ScrollView
      style={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#007AFF"
        />
      }
    >
      {collection.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name={emptyState.icon as any} size={64} color="#666" />
          <Text style={styles.emptyStateTitle}>{emptyState.title}</Text>
          <Text style={styles.emptyStateSubtitle}>{emptyState.subtitle}</Text>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.exploreButtonText}>Explore Movies</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.moviesGrid}>
          {collection.map((movie) => (
            <View key={movie.id} style={styles.movieCard}>
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={{
                    uri: movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750/333/fff?text=No+Image',
                  }}
                  style={styles.poster}
                  resizeMode="cover"
                />

                {/* Rating for rated movies */}
                {/* {activeTab === 'rated' && movie.rating && (
                       <View style={styles.userRating}>
                         <Ionicons name="star" size={12} color="#FFCC00" />
                         <Text style={styles.userRatingText}>{movie.rating}</Text>
                       </View>
                     )}
   
                     {/* Added date badge */}
                {/* {movie.added_date && (
                       <View style={styles.dateBadge}>
                         <Text style={styles.dateText}>
                           {formatDate(movie.added_date)}
                         </Text>
                       </View>
                     )} */}
              </TouchableOpacity>

              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={2}>
                  {movie.title}
                </Text>

                <View style={styles.movieMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>
                      {movie.vote_average.toFixed(1)}
                    </Text>
                  </View>
                  <Text style={styles.year}>
                    {/* {new Date(movie.release_date).getFullYear()} */}
                  </Text>
                </View>

                {/* Remove button */}
                <TouchableOpacity
                  onPress={() => toggleItem(movie)}
                  style={styles.removeButton}
                >
                  <Ionicons
                    name={activeTab === 'favorites' ? 'heart-dislike' : 'trash'}
                    size={16}
                    color="#FF3B30"
                  />
                  <Text style={styles.removeText}>
                    {activeTab === 'favorites' ? 'Remove' : 'Delete'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Stats */}
      {collection.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="film" size={20} color="#007AFF" />
            <Text style={styles.statNumber}>{collection.length}</Text>
            <Text style={styles.statLabel}>Total movies</Text>
          </View>

          {activeTab === 'rated' && (
            <View style={styles.statItem}>
              <Ionicons name="star" size={20} color="#FFCC00" />
              <Text style={styles.statNumber}>
                {/* {(
                       favorites.reduce(
                         (sum, movie) => sum + (movie.rating || 0),
                         0
                       ) / currentList.length
                     ).toFixed(1)} */}
              </Text>
              <Text style={styles.statLabel}>Avg rating</Text>
            </View>
          )}

          <View style={styles.statItem}>
            <Ionicons name="time" size={20} color="#34C759" />
            <Text style={styles.statNumber}>
              {Math.floor(collection.length * 2.5)}h
            </Text>
            <Text style={styles.statLabel}>Watch time</Text>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default LibraryCollection

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    gap: 16,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginTop: 40,
  },
  emptyStateTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  movieCard: {
    width: POSTER_WIDTH,
    marginBottom: 24,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
  },
  userRating: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  userRatingText: {
    color: '#FFCC00',
    fontSize: 12,
    fontWeight: '600',
  },
  dateBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  movieInfo: {
    marginTop: 8,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 18,
  },
  movieMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  year: {
    color: '#888',
    fontSize: 12,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 6,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  removeText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
})
