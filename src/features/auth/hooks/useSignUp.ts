import { supabase } from '@/src/shared/services/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { signUpSchema, signUpSchemaType } from '../lib/zod/sign-up.schema'

export const useSignUp = () => {
  const redirectTo = Linking.createURL('/callback')
  const router = useRouter()
  const { control, handleSubmit } = useForm<signUpSchemaType>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (formData: signUpSchemaType) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            username: formData.username,
          },
        },
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
        Alert.alert('Sign Up Failed', message)
      }
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
  }
}
