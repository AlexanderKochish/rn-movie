import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { getTrailerVideoById } from '@/src/shared/api'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { Colors } from '@/src/shared/styles/Colors'
import { VideosResponse } from '@/src/shared/types/types'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import NotFoundScreen from '../+not-found'

const TrailerScreen = () => {
  const { id } = useLocalSearchParams()
  const { theme } = useTheme()
  const { data, isLoading } = useQuery<VideosResponse, Error>({
    queryKey: ['video-trailer', id],
    queryFn: () => getTrailerVideoById(+id),
    enabled: !!id,
    retry: false,
  })

  if (isLoading) {
    return <Preloader />
  }

  if (!data?.results.length) {
    return <NotFoundScreen />
  }

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <WebView
        source={{
          uri: `https://www.youtube.com/embed/${data?.results[0].key}?controls=1&autoplay=1`,
        }}
        style={{ flex: 1 }}
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  )
}

export default TrailerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
