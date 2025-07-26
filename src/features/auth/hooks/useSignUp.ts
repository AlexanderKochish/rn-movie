import { auth } from '@/src/shared/services/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
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
        Alert.alert('User not found')
      } else {
        router.replace('/(tabs)/profile')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      Alert.alert('Login failed', error.message)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
  }
}
