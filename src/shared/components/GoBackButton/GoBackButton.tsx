import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Colors } from '../../styles/Colors'

const GoBackButton = () => {
  const { theme } = useTheme()
  const router = useRouter()
  return (
    <IconButton
      icon="arrow-left"
      iconColor={Colors[theme].text}
      style={styles.backButton}
      onPress={() => router.back()}
    />
  )
}

export default GoBackButton

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
})
