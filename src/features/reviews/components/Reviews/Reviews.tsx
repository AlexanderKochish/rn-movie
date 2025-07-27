import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useReview } from '../../hooks/useReview'
import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

const Reviews = () => {
  const movieId = useMovieId()
  const { reviews, isLoadingReviews } = useReview(+movieId)
  const { theme } = useTheme()

  if (isLoadingReviews) {
    return <Preloader />
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.titleWrapper}>
        <Text style={[globalStyles.subTitle, { color: Colors[theme].text }]}>
          Reviews
        </Text>
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
          <Text style={{ color: Colors[theme].text }}>
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
})
