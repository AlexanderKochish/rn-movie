import BookmarksTabs from '@/src/features/bookmarks/components/BookmarksTabs/BookmarksTabs'
import Header from '@/src/shared/components/Header/Header'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function BookmarksScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header title="My Library" subTitle="Your personal collection" />
      <BookmarksTabs />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})
