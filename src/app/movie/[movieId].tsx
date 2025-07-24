import { useCredits } from '@/src/features/movie/hooks/useCredits'
import { useMovieDetails } from '@/src/features/movie/hooks/useMovieDetails'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { CrewMember } from '@/src/shared/types/types'

import { useBookmark } from '@/src/features/movie/hooks/useBookmark'
import { useFavorite } from '@/src/features/movie/hooks/useFavorite'
import RatingModal from '@/src/features/rating/components/RatingModal/RatingModal'
import RatingStars from '@/src/features/rating/components/RatingStars/RatingStars'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import {
  ActivityIndicator,
  Icon,
  IconButton,
  PaperProvider,
  Text,
} from 'react-native-paper'

const ITEM_MARGIN = 10
const ITEM_WIDTH = (Dimensions.get('window').width - ITEM_MARGIN * 3) / 2

const MovieDetailsScreen = () => {
  const [visible, setVisible] = React.useState(false)

  const { movieId } = useLocalSearchParams()
  const router = useRouter()
  const {
    isItemToggled: isFavoriteToggled,
    toggleItem: toggleFavorite,
    isLoading: isLoadingFavorite,
  } = useFavorite()
  const {
    isItemToggled: isBookmarkToggled,
    toggleItem: toggleBookmark,
    isLoading: isLoadingBookmark,
  } = useBookmark()
  const isActiveFavorite = isFavoriteToggled(+movieId)
  const isActiveBookmark = isBookmarkToggled(+movieId)

  const { data, isLoading } = useMovieDetails(+movieId)

  const { credits } = useCredits(+movieId)

  const producer = useMemo(
    () => credits?.crew.find((item) => item.job === 'Producer'),
    [credits]
  )

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  const renderCrewItem = useCallback(
    ({ item }: { item: CrewMember }) => (
      <View style={styles.crewItem}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_IMG_W300}${item?.profile_path}`,
          }}
          style={styles.crewImage}
        />
        <View style={{ justifyContent: 'space-around' }}>
          <Text style={styles.text}>{item.name || item.original_name}</Text>
          <Text style={styles.text}>{item.job.slice(0, 16)}...</Text>
        </View>
      </View>
    ),
    []
  )

  if (isLoading) {
    return (
      <View
        style={[
          globalStyles.container,
          { backgroundColor: Colors.dark.background },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <PaperProvider>
      <FlatList
        data={credits?.crew.slice(0, 6) || []}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={renderCrewItem}
        contentContainerStyle={{ backgroundColor: Colors.dark.background }}
        ListHeaderComponent={
          <>
            <View style={{ position: 'relative', height: 500 }}>
              <IconButton
                icon="arrow-left"
                iconColor="#fff"
                style={styles.backButton}
                onPress={() => router.back()}
              />
              <ImageBackground
                source={{
                  uri: `${process.env.EXPO_PUBLIC_IMG_W500}${data?.poster_path || data?.backdrop_path}`,
                }}
                style={styles.imageBackground}
              />
              <View style={styles.headerOverlay}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>
                    {data?.original_title || data?.title}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 20 }}>
                    <Pressable
                      onPress={() => toggleFavorite(data)}
                      disabled={!data || isLoadingFavorite}
                    >
                      <Icon
                        source={isActiveFavorite ? 'star' : 'star-outline'}
                        size={24}
                        color={isActiveFavorite ? 'yellow' : '#fff'}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => toggleBookmark(data)}
                      disabled={!data || isLoadingBookmark}
                    >
                      <Icon
                        source={
                          isActiveBookmark ? 'bookmark' : 'bookmark-outline'
                        }
                        size={24}
                        color={isActiveBookmark ? 'yellow' : '#fff'}
                      />
                    </Pressable>
                  </View>
                </View>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  style={[styles.gradient, { height: 250 }]}
                />
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { color: BaseColors.white }]}>
                2024 | Directed by
              </Text>
              <Text style={[styles.text, { color: BaseColors.orangeLight }]}>
                {producer?.name}
              </Text>
              <Text style={styles.overview}>{data?.overview}</Text>
            </View>

            <View style={styles.rating}>
              <Text style={styles.headerTitle}>Ratings</Text>
              <View style={{ gap: 15 }}>
                <Pressable
                  onPress={showDialog}
                  style={{ flexDirection: 'row' }}
                >
                  {[...Array(5)].map((_, i) => {
                    const startRating = i + 1
                    const rating = Math.ceil(
                      Number(data?.vote_average?.toFixed(1)) / 2
                    )
                    return (
                      <Icon
                        key={i}
                        source={startRating <= rating ? 'star' : 'star-outline'}
                        size={24}
                        color={startRating <= rating ? 'yellow' : 'white'}
                      />
                    )
                  })}
                </Pressable>
                <View>
                  <Text style={styles.text}>
                    {data?.vote_average.toFixed(1)} IMDB | {data?.vote_count}{' '}
                    RATE
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.headerTitle}>Cast & Crew</Text>
            </View>
          </>
        }
      />
      <RatingModal
        hideDialog={hideDialog}
        visible={visible}
        title="Rate this movie!"
        content={<RatingStars />}
      />
    </PaperProvider>
  )
}

export default MovieDetailsScreen

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 5,
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.dark.text,
  },
  imageBackground: {
    height: 500,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: BaseColors.brown,
    borderTopColor: BaseColors.brown,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    gap: 10,
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    zIndex: 15,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  overview: {
    color: Colors.dark.text,
    fontSize: 18,
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    gap: 10,
  },
  text: {
    color: Colors.dark.text,
  },
  crewItem: {
    width: ITEM_WIDTH,
    margin: ITEM_MARGIN,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    overflow: 'hidden',
  },
  crewImage: {
    height: 58,
    width: 58,
    borderRadius: 4,
    backgroundColor: Colors.dark.bgModal,
  },
})
