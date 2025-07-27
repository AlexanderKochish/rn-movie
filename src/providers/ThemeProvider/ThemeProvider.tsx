import { darkTheme, lightTheme } from '@/src/shared/theme/theme'
import { ThemeColorType } from '@/src/shared/types/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const systemColorScheme = useColorScheme()
  const initialTheme = systemColorScheme === 'light' ? 'light' : 'dark'
  const [theme, setTheme] = useState<ThemeColorType>(initialTheme)
  const paperTheme = theme === 'dark' ? darkTheme : lightTheme

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem('app-theme')
        if (stored === 'light' || stored === 'dark') {
          setTheme(stored)
        }
      } catch (error) {
        console.warn('Failed to load theme from storage:', error)
      }
    }
    loadTheme()
  }, [])

  const handleSetTheme = useCallback(async (newTheme: ThemeColorType) => {
    try {
      setTheme(newTheme)
      await AsyncStorage.setItem('app-theme', newTheme)
    } catch (error) {
      console.warn('Failed to save theme to storage:', error)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    handleSetTheme(newTheme)
  }, [handleSetTheme, theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}
