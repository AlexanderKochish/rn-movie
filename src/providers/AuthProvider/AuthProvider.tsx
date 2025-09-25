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
  const [error, setError] = useState<string | null>(null)

  const { saveError } = usePushNotifications()
  const router = useRouter()
  const segments = useSegments() as string[]

  useEffect(() => {
    if (saveError) {
      console.error('Push notification error:', saveError)
      setError('Failed to set up push notifications')
    }
  }, [saveError])

  const checkAcceptedTerms = useCallback((currentUser: User | null) => {
    const accepted = !!currentUser?.user_metadata?.accepted_terms
    setIsLogged(!!currentUser && accepted)
    return accepted
  }, [])

  const acceptTerms = useCallback(async () => {
    if (!user) return
    try {
      const now = new Date().toISOString()

      const { error: updateError } = await supabase.auth.updateUser({
        data: { accepted_terms: true, accepted_terms_date: now },
      })
      if (updateError) throw updateError

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ terms_accepted: true, terms_accepted_at: now })
        .eq('id', user.id)
        .single()
      if (profileError) throw profileError

      const {
        data: { user: refreshed },
      } = await supabase.auth.getUser()
      if (!refreshed) throw new Error('Failed to refresh user')

      setUser(refreshed)
      checkAcceptedTerms(refreshed)
      router.replace('/')
    } catch (err: any) {
      console.error('Error accepting terms:', err)
      setError('Failed to accept terms')
    }
  }, [user, router, checkAcceptedTerms])

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
    let mounted = true

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        const currentUser = session?.user ?? null

        if (!mounted) return

        setUser(currentUser)
        const accepted = checkAcceptedTerms(currentUser)
        handleRedirect(currentUser, accepted)
      } catch (err) {
        console.error('Auth initialization error:', err)
        setError('Failed to initialize authentication')
      } finally {
        if (mounted) setLoading(false)
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
      mounted = false
      subscription.unsubscribe()
    }
  }, [checkAcceptedTerms, handleRedirect])

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ user, loading, isLogged, acceptTerms }}>
      {children}
    </AuthContext.Provider>
  )
}
