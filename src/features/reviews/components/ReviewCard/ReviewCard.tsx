import RatingResult from '@/src/features/rating/components/RatingResult/RatingResult'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  review: string | null
  username: string | null
  avatar?: string | null
  rating: number | null | undefined
}

const ReviewCard = ({ avatar, username, review, rating }: Props) => {
  const { theme } = useTheme()
  return (
    <View style={[styles.card, { backgroundColor: Colors[theme].card }]}>
      <Image
        source={
          avatar
            ? { uri: avatar }
            : require('../../../../../assets/images/profile-placeholder.png')
        }
        style={styles.avatar}
      />
      <View style={styles.content}>
        {review && (
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.review, { color: Colors[theme].text }]}
          >
            {review}
          </Text>
        )}
        <Text style={[styles.username, { color: Colors[theme].text }]}>
          {username}
        </Text>
        <RatingResult voteAverage={rating} />
      </View>
    </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  content: {
    flex: 1,
    gap: 10,
  },
  review: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: Typography.caption.fontSize,
  },
  username: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: Typography.caption.fontSize,
    fontWeight: 'bold',
  },
})
