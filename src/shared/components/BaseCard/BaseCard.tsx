import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

const BaseCard = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme()
  return <View style={styles.card}>{children}</View>
}

export default BaseCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
})
