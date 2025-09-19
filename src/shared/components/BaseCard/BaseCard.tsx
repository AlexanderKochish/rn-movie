import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../styles/Colors'

const BaseCard = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme()
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors[theme].background,
          borderColor: Colors[theme].border,
        },
      ]}
    >
      {children}
    </View>
  )
}

export default BaseCard

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
})
