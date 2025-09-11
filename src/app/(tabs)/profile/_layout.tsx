import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const ProfileLayout = () => {
  const { theme } = useTheme()
  return (
    <>
      <StatusBar style={theme} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors[theme].background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: '',
          }}
        />
        <Stack.Screen
          name="edit-profile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="email-settings"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="whats-new"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="faq"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="terms-of-service"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="privacy-policy"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="security"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  )
}

export default ProfileLayout
