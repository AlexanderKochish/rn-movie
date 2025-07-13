import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={false}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={true}>
          <Stack.Screen name="auth" />
        </Stack.Protected>
      </Stack>
    </>
  )
}
