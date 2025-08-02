import MovieCard from '@/src/features/movie/components/MovieCard/MovieCard'
import { useProfileDetails } from '@/src/features/profile/hooks/useProfileDetails'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import GoBackButton from '@/src/shared/components/GoBackButton/GoBackButton'
import { useParam } from '@/src/shared/hooks/useParam'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import {
  Animated,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'

const HEADER_HEIGHT = 500

const PersonDetailsScreen = () => {
  const personId = Number(useParam('personId'))
  const { data, personMovieCredits } = useProfileDetails(personId)
  const { theme } = useTheme()

  const scrollY = new Animated.Value(0)

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  })

  return (
    <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <GoBackButton />
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <ImageBackground
          style={styles.headerImage}
          source={{
            uri: data?.profile_path
              ? `${process.env.EXPO_PUBLIC_IMG_W300}${data?.profile_path}`
              : `${process.env.EXPO_PUBLIC_POSTER_HOLDER}`,
          }}
          resizeMode="cover"
        />
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT - 50,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View
          style={[
            styles.content,
            { backgroundColor: Colors[theme].background },
          ]}
        >
          <Text style={[styles.title, { color: Colors[theme].text }]}>
            {data?.name}
          </Text>
          <Text style={[styles.biography, { color: Colors[theme].text }]}>
            {data?.biography
              ? data?.biography
              : 'Unfortunately, this person`s biography is not presented.'}
          </Text>
          <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
            Movie Credits
          </Text>

          {!personMovieCredits?.cast.length && (
            <Text style={[{ color: Colors[theme].text }]}>
              Unfortunately, information about the films in which this person
              took part is not provided.
            </Text>
          )}

          <FlatList
            horizontal
            contentContainerStyle={{ padding: 15 }}
            showsHorizontalScrollIndicator={false}
            data={personMovieCredits?.cast}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <MovieCard
                id={item.id}
                imageUrl={`${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`}
                title={item.title || item.original_title}
                vote_average={item.vote_average}
              />
            )}
          />
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default PersonDetailsScreen

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    height: HEADER_HEIGHT,
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20,
    gap: 10,
  },
  title: {
    fontSize: Typography.header2.fontSize,
    fontWeight: '800',
  },
  biography: {
    fontSize: Typography.body.fontSize,
  },
  subtitle: {
    fontSize: Typography.title.fontSize,
    fontWeight: '800',
  },
})
