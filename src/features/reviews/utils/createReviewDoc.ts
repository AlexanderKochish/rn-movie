import { db } from '@/src/shared/services/firebase'
import { User } from 'firebase/auth'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { Alert } from 'react-native'

export const createReviewDoc = async (
  movieId: number,
  user: User | null,
  payload: Record<string, unknown>
) => {
  if (!user) return
  try {
    const userId = user.uid as string
    const ref = doc(db, 'moviesReviews', String(movieId), 'reviews', userId)
    const snapshot = await getDoc(ref)
    if (snapshot.exists()) {
      await updateDoc(ref, { ...payload, updatedAt: serverTimestamp() })
    } else {
      await setDoc(
        ref,
        {
          userId,
          photoUrl: user.photoURL,
          displayName: user.displayName,
          email: user.email,
          ...payload,
          updatedAt: serverTimestamp(),
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
