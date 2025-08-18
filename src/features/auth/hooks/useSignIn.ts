import { supabase } from '@/src/shared/services/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
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

  const onSubmit = async (formData: signInSchemaType) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        Alert.alert('Authentication Error', error.message)
        return
      }
      if (data.session) {
        router.replace('/(tabs)/profile')
      }
    } catch (error: unknown) {
      let message = 'An unexpected error occurred.'
      if (error instanceof Error) {
        Alert.alert('Login failed', message)
      }
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
  }
}
