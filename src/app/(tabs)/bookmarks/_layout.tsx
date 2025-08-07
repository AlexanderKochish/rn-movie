import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'

const BookmarksLayout = () => {
  const { theme } = useTheme()

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          title: '',
          headerStyle: {
            backgroundColor: Colors[theme].background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="favorites"
          options={{
            headerTitle: 'STARS',
            headerTitleStyle: {
              color: Colors[theme].text,
            },
            headerTintColor: Colors[theme].text,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="bookmark"
          options={{
            headerTitle: 'BOOKMARKS',
            headerTitleStyle: {
              color: Colors[theme].text,
            },
            headerTintColor: Colors[theme].text,
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </>
  )
}

export default BookmarksLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
