import { useAuth } from '@/src/features/auth/context/AuthContext'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import { db } from '@/src/shared/services/firebase'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewInput from '../ReviewInput/ReviewInput'

type Props = {
  movieId: number | string
  rating: number | undefined
}

const Reviews = ({ movieId }: Props) => {
  const { user } = useAuth()
  const [review, setReview] = useState('')
  const addReview = async (userId: string, rating: number) => {
    if (!userId) return
    try {
      const ref = doc(db, 'moviesReviews', String(movieId), 'reviews', userId)
      const snapshot = await getDoc(ref)
      if (snapshot.exists()) {
        Alert.alert('Message', 'You can leave only one review.')
      } else {
        await setDoc(
          ref,
          {
            userId,
            rating: rating || undefined,
            review: review || undefined,
            createdAt: serverTimestamp(),
          },
          { merge: true }
        )
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      }
    }
  }
  return (
    <View style={{ padding: 10 }}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Reviews</Text>
        <CustomButton title="See all" variant="secondary" fullWidth={false} />
      </View>
      <ReviewInput />
      <ReviewCard review="ghghjgjhg" username="hgjgjhjh" />
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
  },
  title: {
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
  },
})
