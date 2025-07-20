import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthProvider } from '../features/auth/context/AuthProvider'
import { RootStack } from '../shared/navigation/RootStack'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false)
  const queryClient = new QueryClient()

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RootStack />
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
