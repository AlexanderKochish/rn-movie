import { auth } from '@/src/shared/services/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
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
