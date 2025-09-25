import RatingResult from '@/src/features/rating/components/RatingResult/RatingResult'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { ReviewType } from '@/src/shared/types/types'
import { formatDate } from '@/src/shared/utils/formatDate'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import Toast from 'react-native-toast-message'

type Props = {
  review: ReviewType
  index: number
  removeReview: (id: string) => void
}

const ReviewCard = ({ review, removeReview }: Props) => {
  const { theme } = useTheme()
  const translateX = useSharedValue(0)

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = e.translationX
      }

      if (e.translationX > 0 && translateX.value < 0) {
        translateX.value = withSpring(0)
      }
    })
    .onEnd(() => {
      if (translateX.value > -40) {
        translateX.value = withSpring(0)
      } else {
        translateX.value = withSpring(-80)
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const deleteButtonStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -10 ? 1 : 0,
  }))

  const handlePressDelete = () => {
    translateX.value = withSpring(0)
    Toast.show({
      type: 'customSuccess',
      text1: `The review was successfully deleted.`,
    })
    removeReview(review.id)
  }
  return (
    <GestureHandlerRootView>
      <View style={styles.swipeContainer}>
        <Animated.View
          style={[styles.deleteButtonContainer, deleteButtonStyle]}
        >
          <IconButton
            mode="contained"
            icon={'trash-can-outline'}
            size={24}
            iconColor={Colors[theme].text}
            containerColor={BaseColors.red}
            onPress={handlePressDelete}
          />
        </Animated.View>

        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.reviewCard,
              {
                backgroundColor: Colors[theme].input,
                borderColor: Colors[theme].border,
              },
              animatedStyle,
            ]}
          >
            <View style={styles.reviewHeader}>
              <Image
                source={{
                  uri:
                    review.avatar_url ?? process.env.EXPO_PUBLIC_POSTER_HOLDER,
                }}
                style={styles.avatar}
              />
              <View style={styles.reviewerInfo}>
                <Text style={[styles.userName, { color: Colors[theme].text }]}>
                  {review.username}
                </Text>
                <Text style={styles.reviewDate}>
                  {formatDate(review.created_at)}
                </Text>
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
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
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
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 3,
    zIndex: 2,
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
  reviewerInfo: { flex: 1 },
  userName: {
    fontWeight: '500',
    fontSize: 14,
  },
  reviewDate: {
    color: '#888',
    fontSize: 12,
  },
  reviewText: {
    color: '#b0b0b0',
    fontSize: 14,
    lineHeight: 20,
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
