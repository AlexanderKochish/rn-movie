import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'

const GoBackButton = () => {
  const router = useRouter()
  return (
    <IconButton
      icon="arrow-left"
      iconColor="#fff"
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
