import { db } from '@/src/shared/services/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const getUserData = async (uid: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid))

  if (userDoc.exists()) {
    return userDoc.data()
  }

  return null
}
