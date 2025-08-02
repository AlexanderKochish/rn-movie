import { auth } from '@/src/shared/services/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getIdToken,
  updateProfile,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { signUpSchema, signUpSchemaType } from '../lib/zod/sign-up.schema'

export const useSignUp = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<signUpSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: signUpSchemaType) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, {
        displayName: data.username,
      })

      const token = await getIdToken(auth.currentUser!)
      if (!token) {
        Alert.alert('Authentication Error', 'Unable to retrieve token.')
        return
      }
      router.replace('/(tabs)/profile')
    } catch (error: unknown) {
      let message = 'An unexpected error occurred.'

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'Email is already registered.'
            break
          case 'auth/invalid-email':
            message = 'Invalid email address.'
            break
          case 'auth/weak-password':
            message = 'Password is too weak.'
            break
          default:
            message = error.message
        }
      }

      Alert.alert('Sign Up Failed', message)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
  }
}
