import { ThemeColorType } from '@/src/shared/types/types'
import { StatusBarStyle } from 'expo-status-bar'
import { createContext } from 'react'

type ThemeContextType = {
  theme: ThemeColorType
  toggleTheme: () => void
  statusBarTheme: StatusBarStyle
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)
