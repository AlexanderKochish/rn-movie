import RatingResult from '@/src/features/rating/components/RatingResult/RatingResult'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { ReviewType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

type Props = {
  review: ReviewType
  index: number
}

const ReviewCard = ({ review, index }: Props) => {
  const { theme } = useTheme()
  return (
    <Animated.View
      style={[styles.reviewCard]}
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
  )
}

export default ReviewCard

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
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
