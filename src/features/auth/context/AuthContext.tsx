import { User } from 'firebase/auth'
import { createContext, useContext } from 'react'

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

export const useAuth = () => useContext(AuthContext)
