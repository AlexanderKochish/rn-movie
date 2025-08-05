import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/src/shared/styles/Colors'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import BackTitleHeader from '@/src/shared/components/BackTitleHeader/BackTitleHeader'

const MovieDetailsLayout = () => {
  const { theme } = useTheme()
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="[movieId]/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="[movieId]/reviews/index"
          options={{
            title: 'REVIEWS',
            header: () => (
              <SafeAreaView
                style={{ backgroundColor: Colors[theme].background }}
              >
                <BackTitleHeader title="REVIEWS" />
              </SafeAreaView>
            ),
          }}
        />
        <Stack.Screen
          name="[movieId]/credits/index"
          options={{
            title: 'Cast & Crew',
            header: () => (
              <SafeAreaView
                style={{ backgroundColor: Colors[theme].background }}
              >
                <BackTitleHeader title="CAST & CREW" />
              </SafeAreaView>
            ),
          }}
        />
      </Stack>
    </>
  )
}

export default MovieDetailsLayout
