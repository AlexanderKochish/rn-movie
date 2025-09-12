import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from '../features/auth/context/AuthProvider'
import { ThemeProvider } from '../providers/ThemeProvider/ThemeProvider'
import CustomToast from '../shared/components/UI/CustomToast/CustomToast'
import { RootStack } from '../shared/navigation/RootStack'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
})

export default function RootLayout() {
  const queryClientRef = useRef(new QueryClient())
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await Promise.all([
          // preloadAssets(),
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ])
      } catch (e) {
        console.warn('Initialization error:', e)
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
    <GestureHandlerRootView onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClientRef.current}>
          <AuthProvider>
            <ThemeProvider>
              <RootStack />
              <CustomToast />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
