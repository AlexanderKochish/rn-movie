import { ThemeColorType } from '@/src/shared/types/types'
import { createContext } from 'react'

type ThemeContextType = {
  theme: ThemeColorType
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)
