import RatingStars from '@/src/features/rating/components/RatingStars/RatingStars'
import { useRating } from '@/src/features/rating/hooks/useRating'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { adaptOnChange } from '@/src/shared/utils/adaptOnChange'
import React from 'react'
import { Controller } from 'react-hook-form'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useReview } from '../../hooks/useReview'

type Props = {
  movieId: number
}

const ReviewForm = ({ movieId }: Props) => {
  const { theme } = useTheme()
  const { handleSubmit, control, isLoadingReviews, isPending } =
    useReview(movieId)
  const {
    control: controllRating,
    handleSubmit: handleSubmitRating,
    isPending: isPendingRating,
    ratingWatch,
  } = useRating(movieId)

  const rating = ratingWatch('rating')
  return (
    <Animated.View
      style={styles.addReviewSection}
      entering={FadeInDown.delay(200).springify()}
    >
      <Text style={styles.sectionTitle}>Your Review</Text>

      <View style={styles.ratingSelector}>
        <Text style={styles.ratingLabel}>Your rating:</Text>
        <View style={styles.starsSelector}>
          <Controller
            control={controllRating}
            name="rating"
            disabled={isPendingRating}
            render={({ field: { onChange, value, disabled } }) => (
              <RatingStars
                disabled={disabled}
                rating={value}
                onRate={adaptOnChange(value, onChange)}
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="review"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.commentInput}
            placeholder="Share your thoughts about this movie..."
            placeholderTextColor="#888"
            multiline
            onBlur={onBlur}
            numberOfLines={4}
            value={value}
            onChangeText={(text) => onChange(text)}
          />
        )}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          isLoadingReviews && styles.submitButtonDisabled,
        ]}
        onPress={() => {
          if (rating > 0) {
            handleSubmitRating()
            handleSubmit()
          }

          handleSubmit()
        }}
        disabled={isLoadingReviews}
      >
        {isPending || isPendingRating ? (
          <Text style={styles.submitButtonText}>Posting...</Text>
        ) : (
          <Text style={styles.submitButtonText}>Post Review</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

export default ReviewForm

const styles = StyleSheet.create({
  addReviewSection: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  ratingSelector: {
    marginBottom: 20,
  },
  ratingLabel: {
    color: '#b0b0b0',
    marginBottom: 12,
    fontSize: 14,
  },
  starsSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  commentInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  spoilerToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  spoilerLabel: {
    color: '#b0b0b0',
    marginLeft: 12,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#64b5f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#3a3a3a',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
})
