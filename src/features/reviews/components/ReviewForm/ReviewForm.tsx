import RatingStars from '@/src/features/rating/components/RatingStars/RatingStars'
import { useRating } from '@/src/features/rating/hooks/useRating'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
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
  const { handleSubmit, control, isLoadingReviews, isPending, reviewInput } =
    useReview(movieId)
  const {
    control: controllRating,
    handleSubmit: handleSubmitRating,
    isPending: isPendingRating,
    ratingWatch,
  } = useRating(movieId)

  const rating = ratingWatch('rating')

  const onPressSubmit = () => {
    const hasText = reviewInput && reviewInput?.trim().length > 0
    const hasRating = rating > 0

    if (hasRating) {
      handleSubmitRating()
    }

    if (hasText) {
      handleSubmit()
    }
  }

  return (
    <Animated.View
      style={[
        styles.addReviewSection,
        {
          backgroundColor: Colors[theme].stats,
          borderColor: Colors[theme].border,
          borderWidth: theme === 'dark' ? 1 : 0,
        },
      ]}
      entering={FadeInDown.delay(200).springify()}
    >
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Your Review
      </Text>

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
            style={[
              styles.commentInput,
              {
                backgroundColor: Colors[theme].inputBackground,
                borderColor: Colors[theme].border,
                color: Colors[theme].text,
              },
            ]}
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
        onPress={onPressSubmit}
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
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
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
    borderRadius: 12,
    padding: 16,

    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 16,
    borderWidth: 1,
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
