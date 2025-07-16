import { getMovieById, getMovieCredits } from '@/src/shared/api/moviedb.api'
import { Colors } from '@/src/shared/styles/Colors'
import { CrewMember } from '@/src/shared/types/types'
import { useQuery } from '@tanstack/react-query'
// import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native'
import { Icon, IconButton, Text } from 'react-native-paper'

const ITEM_MARGIN = 10
const ITEM_WIDTH = (Dimensions.get('window').width - ITEM_MARGIN * 3) / 2

const MovieDetails = () => {
  const { movieId } = useLocalSearchParams()

  const { data } = useQuery({
    queryKey: ['details', movieId],
    queryFn: () => getMovieById(+movieId),
  })

  const { data: credits } = useQuery({
    queryKey: ['credits', movieId],
    queryFn: () => getMovieCredits(+movieId),
  })

  const producer = credits?.crew.find((item) => item.job === 'Producer')

  const renderCrewItem = ({ item }: { item: CrewMember }) => (
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
  )

  return (
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
              onPress={() => {}}
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
                  <Icon source="star-outline" size={24} color="#fff" />
                  <Icon source="bookmark-outline" size={24} color="#fff" />
                </View>
              </View>
              {/* <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={[styles.gradient, { height: 100 }]}
              /> */}
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { color: '#FBFAF5' }]}>
              2024 | Directed by
            </Text>
            <Text style={[styles.text, { color: '#FF8864' }]}>
              {producer?.name}
            </Text>
            <Text style={styles.overview}>{data?.overview}</Text>
          </View>

          <View style={styles.rating}>
            <Text style={styles.headerTitle}>Ratings</Text>
            <View style={{ gap: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon source="star" size={24} color="yellow" />
                <Icon source="star" size={24} color="yellow" />
                <Icon source="star" size={24} color="yellow" />
                <Icon source="star" size={24} color="yellow" />
                <Icon source="star-outline" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.text}>
                  {data?.vote_average.toFixed(1)} IMDB | {data?.vote_count} RATE
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
  )
}

export default MovieDetails

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
    borderBottomColor: '#4C1C00',
    borderTopColor: '#4C1C00',
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
    color: '#fff',
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
    backgroundColor: '#444',
  },
})
