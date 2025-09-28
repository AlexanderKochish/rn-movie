import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const MovieDetailsLayout = () => {
  const { theme, statusBarTheme } = useTheme()
  return (
    <>
      <StatusBar style={statusBarTheme} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors[theme].background,
          },
        }}
      >
        <Stack.Screen
          name="[movieId]/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="[movieId]/reviews/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[movieId]/credits/index"
          options={{
            headerTitle: 'CAST & CREW',
            headerTintColor: Colors[theme].text,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Colors[theme].text,
            },
          }}
        />
      </Stack>
    </>
  )
}

export default MovieDetailsLayout
