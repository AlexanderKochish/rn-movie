import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useReview } from '../../hooks/useReview'
import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'
import SubsectionHeader from '@/src/shared/components/SubsectionHeader/SubsectionHeader'

const Reviews = () => {
  const movieId = useMovieId()
  const { reviews, isLoadingReviews } = useReview(+movieId)
  const { theme } = useTheme()

  if (isLoadingReviews) {
    return <Preloader />
  }

  return (
    <View style={styles.container}>
      <SubsectionHeader
        title={'Reviews'}
        link={`/(movie)/${movieId}/reviews`}
      />
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
  container: {
    flex: 1,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: BaseColors.brown,
    gap: 5,
  },
})
