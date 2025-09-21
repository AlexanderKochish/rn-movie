import RatingResult from '@/src/features/rating/components/RatingResult/RatingResult'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors } from '@/src/shared/styles/Colors'
import { ReviewType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

type Props = {
  review: ReviewType
  index: number
  removeReview: (id: string) => void
}

const ReviewCard = ({ review, index, removeReview }: Props) => {
  const { theme } = useTheme()

  const translateX = useSharedValue(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })
  const deleteButtonStyle = useAnimatedStyle(() => {
    const opacity = translateX.value < -10 ? 1 : 0
    return {
      opacity: withSpring(opacity, { damping: 20 }),
    }
  })

  const handleSwipe = (event: any) => {
    const { translationX } = event.nativeEvent

    if (translationX < -20 && !isSwiping) {
      setIsSwiping(true)
      translateX.value = withSpring(-80, { damping: 20 })
    } else if (translationX > -10 && isSwiping) {
      setIsSwiping(false)
      translateX.value = withSpring(0, { damping: 20 })
    }
  }

  const handlePressDelete = () => {
    translateX.value = withSpring(0, { damping: 20 })
    Alert.alert('Remove', `Review with id: ${review.id} is was deleted`)
    removeReview(review.id)
  }

  const resetSwipe = () => {
    if (isSwiping) {
      setIsSwiping(false)
      translateX.value = withSpring(0, { damping: 20 })
    }
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.swipeContainer}>
        <Animated.View
          style={[styles.deleteButtonContainer, deleteButtonStyle]}
        >
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: BaseColors.red }]}
            onPress={handlePressDelete}
          >
            <Ionicons name="trash" size={20} color="white" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          onTouchMove={handleSwipe}
          onTouchEnd={resetSwipe}
          style={[styles.reviewCard, animatedStyle]}
          entering={FadeInUp.delay(index * 100).springify()}
        >
          <View style={styles.reviewHeader}>
            <Image
              source={{
                uri: review.photo_url
                  ? review.photo_url
                  : process.env.EXPO_PUBLIC_POSTER_HOLDER,
              }}
              style={styles.avatar}
            />
            <View style={styles.reviewerInfo}>
              <Text style={styles.userName}>{review.display_name}</Text>
              <Text style={styles.reviewDate}>{review.updatedAt}</Text>
            </View>
            {review.rating && <RatingResult voteAverage={review.rating} />}
          </View>

          <Text style={styles.reviewText}>{review.review}</Text>
          <View style={styles.reviewActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="thumbs-up-outline" size={16} color="#64b5f6" />
              <Text style={styles.actionText}>Helpful</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={16} color="#64b5f6" />
              <Text style={styles.actionText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
  swipeHint: {
    marginLeft: 8,
  },
  swipeContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 12,
  },
  deleteButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    zIndex: 1,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    elevation: 3,
    zIndex: 2,
  },
  spoilerCard: {
    borderColor: '#ff6b6b',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 14,
  },
  reviewDate: {
    color: '#888',
    fontSize: 12,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewText: {
    color: '#b0b0b0',
    fontSize: 14,
    lineHeight: 20,
  },
  spoilerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  spoilerText: {
    color: '#ff6b6b',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  reviewActions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    color: '#64b5f6',
    marginLeft: 6,
    fontSize: 12,
  },
})
