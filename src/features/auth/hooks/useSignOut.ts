import { supabase } from '@/src/shared/services/supabase'

export const useSignOut = () => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return {
    signOut,
  }
}
