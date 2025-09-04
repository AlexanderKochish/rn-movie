import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { ReviewType } from '@/src/shared/types/types'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useReview } from '../../hooks/useReview'
import ReviewCard from '../ReviewCard/ReviewCard'

const Reviews = () => {
  const movieId = useMovieId()
  const { reviews, isLoadingReviews } = useReview(+movieId)
  const { theme } = useTheme()

  const renderReviewItem = ({
    item,
    index,
  }: {
    item: ReviewType
    index: number
  }) => <ReviewCard index={index} review={item} />

  if (isLoadingReviews) {
    return <Preloader />
  }

  return (
    <View style={styles.reviewsSection}>
      <Text style={styles.sectionTitle}>
        Community Reviews ({reviews?.length})
      </Text>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },

  reviewsSection: {
    margin: 16,
  },
  separator: {
    height: 16,
  },
})
