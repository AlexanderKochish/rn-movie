import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { BaseColors, Colors } from '../../styles/Colors'

const BaseCard = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme()
  return (
    <View style={[styles.card, { backgroundColor: Colors[theme].card }]}>
      {children}
    </View>
  )
}

export default BaseCard

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 15,
    gap: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: BaseColors.gray,
  },
})
