import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'
import { Colors } from '../styles/Colors'

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.light.btn,
    background: Colors.light.background,
    surface: Colors.light.bgModal,
    text: Colors.light.text,
    onSurface: Colors.light.text,
    outline: Colors.light.dots,
  },
}

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.dark.btn,
    background: Colors.dark.background,
    surface: Colors.dark.bgModal,
    text: Colors.dark.text,
    onSurface: Colors.dark.text,
    outline: Colors.dark.dots,
  },
}
