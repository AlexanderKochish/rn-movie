import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { Stack } from 'expo-router'
import Preloader from '../components/UI/Preloader/Preloader'

export const RootStack = () => {
  const { isLogged, user, loading } = useAuth()
  if (loading) {
    return <Preloader />
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLogged}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!user || !isLogged}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  )
}
