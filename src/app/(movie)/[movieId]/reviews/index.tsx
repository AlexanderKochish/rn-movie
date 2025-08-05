import { useReview } from '@/src/features/reviews/hooks/useReview'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ReviewCard from '@/src/features/reviews/components/ReviewCard/ReviewCard'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { Typography } from '@/src/shared/styles/Typography'

const ReviewsScreen = () => {
  const movieId = useMovieId()
  const { reviews } = useReview(movieId)
  const { theme } = useTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <FlatList
        style={{ flex: 1 }}
        data={reviews}
        ListEmptyComponent={
          <Text
            style={{
              color: Colors[theme].text,
              fontSize: Typography.title.fontSize,
            }}
          >
            Reviews list is empty!
          </Text>
        }
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ReviewCard
            review={item.review}
            rating={item.rating}
            username={item.displayName}
            avatar={item.photoUrl}
          />
        )}
      />
    </View>
  )
}

export default ReviewsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
})
