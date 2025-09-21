import { MovieDetailsType } from '@/src/features/movie/types/types'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { UseMutateFunction } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { ComponentProps } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import BookmarkCard from '../BookmarkCard/BookmarkCard'
import BookmarkStats from '../BookmarkStats/BookmarkStats'

type Props = {
  collection: MovieDetailsType[] | null
  activeTab: 'rated' | 'favorites' | 'watchlist'
  isLoading: boolean
  toggleItem: UseMutateFunction<
    void,
    unknown,
    MovieDetailsType | undefined,
    unknown
  >
  isError: boolean
}

const LibraryCollection = ({
  collection,
  activeTab,
  isLoading,
  toggleItem,
  isError,
}: Props) => {
  const router = useRouter()

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

  if (isError) {
    return (
      <EmptyState
        icon="warning"
        colorIcon={BaseColors.red}
        title="Error"
        description="Error to get favorites collections of films"
      />
    )
  }

  if (isLoading) {
    return <Preloader text="Loading your bookmarks..." />
  }

  const emptyState = getEmptyStateConfig()
  return (
    <View style={styles.container}>
      {collection && collection?.length > 0 && (
        <BookmarkStats collection={collection} />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={styles.moviesGrid}
        numColumns={2}
        data={collection}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item: movie }) => (
          <BookmarkCard
            key={movie.id}
            movie={movie}
            toggleItem={toggleItem}
            activeTab={activeTab}
          />
        )}
        ListEmptyComponent={
          <View style={globalStyles.flex}>
            <EmptyState
              icon={emptyState.icon as ComponentProps<typeof Ionicons>['name']}
              title={emptyState.title}
              description={emptyState.subtitle}
            >
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => router.push('/')}
              >
                <Text style={styles.exploreButtonText}>Explore Movies</Text>
              </TouchableOpacity>
            </EmptyState>
          </View>
        }
      />
    </View>
  )
}

export default LibraryCollection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  exploreButton: {
    backgroundColor: BaseColors.blueDark,
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
    paddingTop: 8,
    paddingBottom: 35,
  },
  separator: {
    height: 16,
  },
})
