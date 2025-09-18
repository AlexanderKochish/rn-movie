import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { usePushNotifications } from '@/src/shared/hooks/usePushNotifications'
import { supabase } from '@/src/shared/services/supabase'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const { saveError } = usePushNotifications()
  const router = useRouter()

  useEffect(() => {
    if (saveError) {
      console.error('Push notification error:', saveError)
      Alert.alert('Error', 'Failed to set up push notifications')
    }
  }, [saveError])

  const acceptTerms = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          accepted_terms: true,
          accepted_terms_date: new Date().toISOString(),
        },
      })

      if (error) throw error
      Alert.alert('Success', 'Terms of Policy is has been accepted')
      router.replace('/')
    } catch (error) {
      console.error('Error accepting terms:', error)
      Alert.alert('Error', 'Failed to accept terms. Please try again.')
      throw error
    }
  }

  const checkUserAndAcceptedPolicy = useCallback(
    (acceptedTerms: boolean, user: boolean) => {
      if (!!user && acceptedTerms) {
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
    },
    []
  )

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      checkUserAndAcceptedPolicy(
        !!currentUser?.user_metadata.accepted_terms,
        !!currentUser
      )
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === 'TOKEN_REFRESHED' || _event === 'SIGNED_IN') {
        setLoading(true)
      }
      const currentUser = session?.user ?? null
      setUser(currentUser)
      checkUserAndAcceptedPolicy(
        !!currentUser?.user_metadata.accepted_terms,
        !!currentUser
      )
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [checkUserAndAcceptedPolicy])

  if (loading) {
    return <Preloader />
  }

  const value = {
    user,
    loading,
    isLogged,
    acceptTerms,
  }

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
