import RatingResult from '@/src/features/rating/components/RatingResult/RatingResult'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  review: string | null
  username: string | null
  avatar?: string | null
  rating: number | null
}

const ReviewCard = ({ avatar, username, review, rating }: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={
          avatar
            ? { uri: avatar }
            : require('../../../../../assets/images/profile-placeholder.png')
        }
        style={styles.avatar}
      />
      <View style={styles.content}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.review}>
          {review}
        </Text>
        <Text style={styles.username}>{username}</Text>
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
    backgroundColor: Colors.dark.input,
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
    color: Colors.dark.text,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: Typography.caption.fontSize,
  },
  username: {
    color: Colors.dark.text,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: Typography.caption.fontSize,
    fontWeight: 'bold',
  },
})
