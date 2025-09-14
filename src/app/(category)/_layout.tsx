import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const CategoryLayout = () => {
  const { theme, statusBarTheme } = useTheme()
  return (
    <>
      <StatusBar style={statusBarTheme} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors[theme].background,
          },
        }}
      >
        <Stack.Screen name="popular/index" />
        <Stack.Screen name="upcoming/index" />
        <Stack.Screen name="now_playing/index" />
      </Stack>
    </>
  )
}

export default CategoryLayout
