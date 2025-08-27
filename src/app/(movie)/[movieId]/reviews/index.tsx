import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import ReviewCard from '@/src/features/reviews/components/ReviewCard/ReviewCard'
import { useReview } from '@/src/features/reviews/hooks/useReview'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

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
        data={reviews || []}
        contentContainerStyle={{ gap: 10 }}
        ListEmptyComponent={
          <View style={styles.emptyTextWrapper}>
            <Text
              style={{
                color: Colors[theme].text,
                fontSize: Typography.title.fontSize,
              }}
            >
              Reviews list is empty!
            </Text>
          </View>
        }
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ReviewCard
            review={item.review}
            rating={item.rating}
            username={item.display_name}
            avatar={item.photo_url}
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
  emptyTextWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
})
