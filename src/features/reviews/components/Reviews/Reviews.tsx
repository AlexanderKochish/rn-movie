import CustomButton from '@/src/shared/components/UI/Button/Button'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useReview } from '../../hooks/useReview'
import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

type Props = {
  movieId: number | string
  rating: number | undefined
}

const Reviews = ({ movieId }: Props) => {
  const { reviews, isLoadingReviews } = useReview(+movieId)

  if (isLoadingReviews) {
    return <Preloader />
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Reviews</Text>
        <CustomButton
          title="See all"
          variant="secondary"
          fullWidth={false}
          size="small"
        />
      </View>
      <ReviewForm movieId={+movieId} />
      <View style={{ gap: 10 }}>
        {!reviews?.length && (
          <Text style={{ color: Colors.dark.text }}>
            No reviews at this moment
          </Text>
        )}
        {reviews?.slice(-5).map((item) => (
          <ReviewCard
            key={item.id}
            review={item.review}
            username={item.displayName}
            rating={item.rating}
            avatar={item.photoUrl}
          />
        ))}
      </View>
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({
  titleWrapper: {
    borderTopWidth: 1,
    borderTopColor: BaseColors.brown,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  title: {
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
  },
})
