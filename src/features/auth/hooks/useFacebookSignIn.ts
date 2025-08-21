import { supabase } from '@/src/shared/services/supabase'
import { makeRedirectUri } from 'expo-auth-session'
import { Alert } from 'react-native'

export const useFacebookSignIn = () => {
  const redirectTo = makeRedirectUri()
  const signInWithFacebook = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      })

      if (error) {
        Alert.alert('Error', error.message)
      }

      Alert.alert('Success', 'The user has successfully logged in.')
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      }
    }
  }

  return {
    signInWithFacebook,
  }
}
