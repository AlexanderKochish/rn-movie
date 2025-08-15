import axios from 'axios'
import { GithubOAuthRequest, GithubOAuthResponse } from '../types/auth.types'

export const createTokenWithCode = async (code: string) => {
  const url = 'https://github.com/login/oauth/access_token'

  const body: GithubOAuthRequest = {
    code,
    client_id: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
    client_secret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
  }

  const { data } = await axios.post<GithubOAuthResponse>(url, body, {
    headers: {
      Accept: 'application/json',
    },
  })

  return data
}
