import Footer from '@/src/features/home/components/Footer/Footer'
import QuickActions from '@/src/features/home/components/QuickActions/QuickActions'
import MovieRow from '@/src/features/movie/components/MovieRow/MovieRow'
import { useHomeMovies } from '@/src/features/movie/hooks/useHomeMovies'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomCarousel from '@/src/shared/components/CustomCarousel/CustomCarousel'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'

import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useRef } from 'react'
import { Animated, RefreshControl, StyleSheet, View } from 'react-native'

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
  const { theme, statusBarTheme } = useTheme()
  const navigateToCategory = (category: string) => {
    router.push(`/(category)/${category}`)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <StatusBar style={statusBarTheme} />

      <Animated.ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: Colors[theme].background },
        ]}
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
  scrollContent: {
    paddingBottom: 40,
  },

  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
})
