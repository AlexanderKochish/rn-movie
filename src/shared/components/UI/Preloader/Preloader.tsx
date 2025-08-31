import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

type Props = {
  size?: 'small' | 'large'
}

const Preloader = ({ size = 'large' }: Props) => {
  const { theme } = useTheme()
  return (
    <View
      style={[
        globalStyles.container,
        { backgroundColor: Colors[theme].background },
      ]}
    >
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <Ionicons name="film" size={64} color="#666" />
        <Text style={[styles.loadingText, { color: Colors[theme].text }]}>
          Loading new movies...
        </Text>
        <ActivityIndicator size={size} />
      </View>
    </View>
  )
}

export default Preloader

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
})
