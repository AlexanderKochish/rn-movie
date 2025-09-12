import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps, ReactNode } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Colors } from '../../styles/Colors'

type Props = {
  title?: string
  description?: string
  icon: ComponentProps<typeof Ionicons>['name']
  colorIcon?: string
  children?: ReactNode
  style?: ViewStyle
}

const EmptyState = ({
  title,
  description,
  icon,
  colorIcon = '#666',
  style,
  children,
}: Props) => {
  const { theme } = useTheme()
  return (
    <View
      style={[
        styles.emptyState,
        { backgroundColor: Colors[theme].emptyStateBackground },
        { borderColor: Colors[theme].border },
        { ...style },
      ]}
    >
      <Ionicons name={icon} size={64} color={colorIcon} />
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
