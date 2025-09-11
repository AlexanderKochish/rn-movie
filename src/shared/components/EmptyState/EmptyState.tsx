import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

type Props = {
  title?: string
  description?: string
  icon: ComponentProps<typeof Ionicons>['name']
  colorIcon?: string

  style?: ViewStyle
}

const EmptyState = ({
  title,
  description,
  icon,
  colorIcon = '#666',
  style,
}: Props) => {
  return (
    <View style={[styles.emptyState, { ...style }]}>
      <Ionicons name={icon} size={64} color={colorIcon} />
      <Text style={styles.emptyStateTitle}>{title}</Text>
      <Text style={styles.emptyStateText}>{description}</Text>
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    margin: 15,
  },
  emptyStateTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
})
