import { supabase } from '@/src/shared/services/supabase'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleUrl = async (incomingUrl: string | null) => {
      if (!incomingUrl) return
      const { data, error } =
        await supabase.auth.exchangeCodeForSession(incomingUrl)
      if (error) {
        console.warn('exchange error:', error.message)
        return
      }
      router.replace('/(tabs)/index')
    }

    Linking.getInitialURL().then(handleUrl)

    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url))
    return () => sub.remove()
  }, [router])

  return null
}
