import Footer from '@/src/features/home/components/Footer/Footer'
import Header from '@/src/features/home/components/Header/Header'
import QuickActions from '@/src/features/home/components/QuickActions/QuickActions'
import MovieRow from '@/src/features/movie/components/MovieRow/MovieRow'
import { useHomeMovies } from '@/src/features/movie/hooks/useHomeMovies'
import CustomCarousel from '@/src/shared/components/CustomCarousel/CustomCarousel'

import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useRef } from 'react'
import { Animated, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function HomeScreen() {
  const router = useRouter()
  const scrollY = useRef(new Animated.Value(0)).current
  const {
    nowPlaying,
    popular,
    topRated,
    trending,
    upcoming,
    isLoading,
    refetch,
    isRefetching,
  } = useHomeMovies()

  const navigateToCategory = (category: string) => {
    router.push(`/(category)/${category}`)
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading amazing movies...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Header />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch.all()}
            tintColor="#007AFF"
            colors={['#007AFF']}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {trending && <CustomCarousel items={trending} />}

        <QuickActions navigateToCategory={navigateToCategory} />

        <MovieRow
          title="Now Playing in Theaters"
          movies={nowPlaying}
          onViewAll={() => navigateToCategory('now_playing')}
        />

        <MovieRow
          title="Popular Movies"
          movies={popular}
          onViewAll={() => navigateToCategory('popular')}
        />

        <MovieRow
          title="Top Rated"
          movies={topRated}
          onViewAll={() => navigateToCategory('top_rated')}
        />

        <MovieRow
          title="Coming Soon"
          movies={upcoming}
          onViewAll={() => navigateToCategory('upcoming')}
        />

        <Footer />
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
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

  scrollContent: {
    paddingBottom: 40,
  },

  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
})
