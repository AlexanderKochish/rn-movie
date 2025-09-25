import BookmarksTabs from '@/src/features/bookmarks/components/BookmarksTabs/BookmarksTabs'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Header from '@/src/shared/components/Header/Header'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'

export default function BookmarksScreen() {
  const { theme, statusBarTheme } = useTheme()
  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <StatusBar style={statusBarTheme} />
      <Header title="My Library" subTitle="Your personal collection" />
      <BookmarksTabs />
    </View>
  )
}
