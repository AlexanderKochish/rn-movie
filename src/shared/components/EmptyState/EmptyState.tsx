import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps, ReactNode } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { BaseColors, Colors } from '../../styles/Colors'

type Props = {
  title?: string
  description?: string
  icon: ComponentProps<typeof Ionicons>['name']
  colorIcon?: string
  children?: ReactNode
  style?: ViewStyle
  iconSize?: number
}

const EmptyState = ({
  title,
  description,
  icon,
  colorIcon = BaseColors.gray,
  style,
  children,
  iconSize = 64,
}: Props) => {
  const { theme } = useTheme()
  return (
    <View
      style={[
        styles.emptyState,
        { backgroundColor: Colors[theme].stats },
        { borderColor: Colors[theme].border },
        { ...style },
      ]}
    >
      <Ionicons name={icon} size={iconSize} color={colorIcon} />
      <Text style={[styles.emptyStateTitle, { color: Colors[theme].text }]}>
        {title}
      </Text>
      <Text style={styles.emptyStateText}>{description}</Text>
      {children}
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderWidth: 1,
    borderRadius: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
})
