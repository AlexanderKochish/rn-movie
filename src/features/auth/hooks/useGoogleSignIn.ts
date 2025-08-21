import { supabase } from '@/src/shared/services/supabase'
import {
  GoogleSignin,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { Alert } from 'react-native'

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  offlineAccess: true,
  scopes: ['profile', 'email'],
})

export const useGoogleSignIn = () => {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      if (isSuccessResponse(userInfo)) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken!,
        })

        if (error) {
          Alert.alert('Error', error.message)
        }
        Alert.alert('Success', data.user?.email)
      } else {
        Alert.alert('Error', 'no ID token present!')
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled')
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('Cancelled', 'play services not available or outdated')
      } else {
        // some other error happened
        console.log({ error })
      }
    }
  }

  return {
    signInWithGoogle,
  }
}
