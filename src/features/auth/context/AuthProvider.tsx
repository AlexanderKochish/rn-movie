import { supabase } from '@/src/shared/services/supabase'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { User } from '@supabase/supabase-js'
import { PropsWithChildren, useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isLogged, setIsLogged] = useState<boolean>(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setIsLogged(!!user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLogged(!!session?.user)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
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
