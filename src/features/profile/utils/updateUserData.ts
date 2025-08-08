import { db } from '@/src/shared/services/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { accountSchemaType } from '../lib/zod/account.schema'

export type FirestoreUserData = Omit<accountSchemaType, 'username' | 'avatar'>

export const setUserData = async (uid: string, data: FirestoreUserData) => {
  return await setDoc(doc(db, 'users', uid), data, { merge: true })
}
