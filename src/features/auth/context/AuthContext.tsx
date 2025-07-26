import { User } from 'firebase/auth'
import { createContext } from 'react'

type AuthContextType = {
  user: User | null
  loading: boolean
  isLogged: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLogged: false,
})
