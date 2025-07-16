import { auth } from '@/src/shared/services/firebase'
import {
  FirebaseAuthTypes,
  onAuthStateChanged,
} from '@react-native-firebase/auth'
import { ReactNode, useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { AuthContext } from './AuthContext'

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isLogged, setIsLogged] = useState<boolean>(false)

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
      setIsLogged(true)
    })

    return unsbscribe
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, isLogged }}>
      {children}
    </AuthContext.Provider>
  )
}
