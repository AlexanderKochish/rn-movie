export type GithubOAuthRequest = {
  code: string
  client_id: string
  client_secret: string
}

export type GithubOAuthResponse = {
  access_token: string
  scope: string
  token_type: string
}
