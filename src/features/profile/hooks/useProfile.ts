import { supabase } from '@/src/shared/services/supabase'
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'

export const useProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) console.log(error)
      else setProfile(data)
    }

    fetchProfile()
  }, [user])

  return {
    profile,
  }
}
