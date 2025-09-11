import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../styles/Colors'

type Props = {
  children: ReactNode
}

const MenuSection = ({ children }: Props) => {
  const { theme } = useTheme()
  return (
    <View
      style={[
        styles.menuSection,
        {
          backgroundColor: Colors[theme].settigsItem,
          borderColor: Colors[theme].border,
        },
      ]}
    >
      {children}
    </View>
  )
}

export default MenuSection

const styles = StyleSheet.create({
  menuSection: {
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
})
