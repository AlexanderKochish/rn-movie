import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { Stack } from 'expo-router'

export const RootStack = () => {
  const { isLogged } = useAuth()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLogged}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLogged}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  )
}
