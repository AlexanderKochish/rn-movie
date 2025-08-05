import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileLayout = () => {
  const { theme } = useTheme()
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors[theme].background }}
      >
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
            name="account"
            options={{
              headerTitle: 'ACCOUNT',
              headerTintColor: Colors[theme].text,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: Colors[theme].text,
              },
            }}
          />
          <Stack.Screen
            name="email-settings"
            options={{
              headerTitle: 'EMAIL SETTINGS',
              headerTintColor: Colors[theme].text,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: Colors[theme].text,
              },
            }}
          />
          <Stack.Screen
            name="security"
            options={{
              headerTitle: 'SECURITY',
              headerTintColor: Colors[theme].text,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: Colors[theme].text,
              },
            }}
          />
        </Stack>
      </SafeAreaView>
    </>
  )
}

export default ProfileLayout
