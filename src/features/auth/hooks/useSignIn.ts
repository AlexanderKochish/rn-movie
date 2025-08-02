import { auth } from '@/src/shared/services/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { FirebaseError } from 'firebase/app'
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { signInSchema, signInSchemaType } from '../lib/zod/sign-in.schema'

export const useSignIn = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<signInSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: signInSchemaType) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      const token = await getIdToken(userCredential.user)
      if (!token) {
        Alert.alert('Authentication Error', 'Unable to retrieve token.')
        return
      }
      router.replace('/(tabs)/profile')
    } catch (error: unknown) {
      let message = 'An unexpected error occurred.'
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            message = 'User not found.'
            break
          case 'auth/wrong-password':
            message = 'Incorrect password.'
            break
          case 'auth/invalid-email':
            message = 'Invalid email format.'
            break
        }
      }

      Alert.alert('Login failed', message)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
  }
}
