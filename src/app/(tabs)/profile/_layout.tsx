import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'
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
          <Stack.Screen name="index" options={{ headerShown: false }} />
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
        </Stack>
      </SafeAreaView>
    </>
  )
}

export default ProfileLayout

const styles = StyleSheet.create({})
