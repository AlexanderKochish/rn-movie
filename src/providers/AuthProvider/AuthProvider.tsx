import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { usePushNotifications } from '@/src/shared/hooks/usePushNotifications'
import { supabase } from '@/src/shared/services/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter, useSegments } from 'expo-router'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  const { saveError } = usePushNotifications()
  const router = useRouter()
  const segments = useSegments() as string[]

  useEffect(() => {
    if (saveError) {
      console.error('Push notification error:', saveError)
      Alert.alert('Error', 'Failed to set up push notifications')
    }
  }, [saveError])

  const checkAcceptedTerms = (currentUser: User | null) => {
    const accepted = !!currentUser?.user_metadata?.accepted_terms
    setIsLogged(!!currentUser && accepted)
    return accepted
  }

  const acceptTerms = async () => {
    try {
      if (!user) return

      const { error } = await supabase.auth.updateUser({
        data: {
          accepted_terms: true,
          accepted_terms_date: new Date().toISOString(),
        },
      })
      if (error) throw error

      const {
        data: { user: refreshed },
      } = await supabase.auth.getUser()
      if (!refreshed) throw new Error('Failed to refresh user')

      setUser(refreshed)
      checkAcceptedTerms(refreshed)

      await supabase
        .from('profiles')
        .update({
          terms_accepted: true,
          terms_accepted_at: new Date().toISOString(),
        })
        .eq('id', refreshed.id)
        .single()

      router.replace('/')
    } catch (err) {
      console.error('Error accepting terms:', err)
      Alert.alert('Error', 'Failed to accept terms')
    }
  }

  const handleRedirect = useCallback(
    (currentUser: User | null, accepted: boolean) => {
      const onAcceptPage = segments.includes('accept-terms')
      if (currentUser && !accepted && !onAcceptPage) {
        router.replace('/(auth)/accept-terms')
      } else if (currentUser && accepted && onAcceptPage) {
        router.replace('/')
      }
    },
    [router, segments]
  )
  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        const currentUser = session?.user ?? null

        setUser(currentUser)
        const accepted = checkAcceptedTerms(currentUser)
        handleRedirect(currentUser, accepted)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      const accepted = checkAcceptedTerms(currentUser)

      handleRedirect(currentUser, accepted)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [handleRedirect])

  if (loading) {
    return <Preloader />
  }

  return (
    <AuthContext.Provider value={{ user, loading, isLogged, acceptTerms }}>
      {children}
    </AuthContext.Provider>
  )
}
