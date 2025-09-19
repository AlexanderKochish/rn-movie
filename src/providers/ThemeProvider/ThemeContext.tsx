import { ThemeColorType } from '@/src/shared/types/types'
import { StatusBarStyle } from 'expo-status-bar'
import { createContext } from 'react'
import { ColorValue } from 'react-native'

type ThemeContextType = {
  theme: ThemeColorType
  toggleTheme: () => void
  statusBarTheme: StatusBarStyle
  getThemeGradient: (
    theme: ThemeColorType,
    customColors?: readonly [ColorValue, ColorValue, ...ColorValue[]],
    reverse?: boolean
  ) => readonly [ColorValue, ColorValue, ...ColorValue[]]
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)
