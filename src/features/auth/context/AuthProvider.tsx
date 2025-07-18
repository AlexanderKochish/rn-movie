import { auth } from '@/src/shared/services/firebase'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { onAuthStateChanged, User } from 'firebase/auth'
import { PropsWithChildren, useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
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
      <View style={globalStyles.container}>
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
