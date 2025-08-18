import { supabase } from '@/src/shared/services/supabase'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export const useGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '1071199830580-qb9bshb0jl82bpucdr49b4bsvoc5nna5.apps.googleusercontent.com',
  })
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

      await GoogleSignin.signIn()

      const { idToken } = await GoogleSignin.getTokens()
      console.log('idToken:' + idToken)
      if (!idToken) {
        throw new Error('Google Sign-In: no ID token present!')
      }

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      })
      console.log('Supabase session:', data.session)
      return data.session
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Google sign-in failed:', error.message)
      }

      return null
    }
  }

  return {
    onGoogleButtonPress,
  }
}
