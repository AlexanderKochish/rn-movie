import { User } from '@supabase/supabase-js'
import { createContext } from 'react'

export type AuthContextType = {
  user: User | null
  loading: boolean
  isLogged: boolean
  acceptTerms: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLogged: false,
  acceptTerms: async () => {},
})
