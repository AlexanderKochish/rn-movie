import {
  AuthSessionResult,
  makeRedirectUri,
  useAuthRequest,
} from 'expo-auth-session'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { createTokenWithCode } from '../utils/createTokenWithCode'

export const useGithubSignIn = () => {
  const clientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`,
  }
  const [, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId!,
      scopes: ['read:user', 'user:email'],
      extraParams: { prompt: 'consent' },
      redirectUri: makeRedirectUri({
        scheme: 'rnmovieapp',
      }),
    },
    discovery
  )

  useEffect(() => {
    const handleResponse = async (response: AuthSessionResult | null) => {
      try {
        if (response?.type === 'success') {
          const { code } = response.params
          const { access_token } = await createTokenWithCode(code)
          if (!access_token) return
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to sign in with GitHub'
        console.error('GitHub Sign-In Error:', error)
        Alert.alert('Error', message)
      }
    }
    handleResponse(response)
  }, [response])

  return {
    promptAsync,
  }
}
