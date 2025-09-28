import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
  onShowMore: (show: boolean) => void
}

const ExpandButton = ({ onShowMore }: Props) => {
  const { theme } = useTheme()
  return (
    <TouchableOpacity
      style={[
        styles.showMoreButton,
        {
          backgroundColor: Colors[theme].actionBtn,
          borderColor: Colors[theme].border,
        },
      ]}
      onPress={() => onShowMore(true)}
    >
      <Text style={styles.showMoreText}>Show Full Privacy Policy</Text>
      <Ionicons name="chevron-down" size={16} color={BaseColors.blueDark} />
    </TouchableOpacity>
  )
}

export default ExpandButton

const styles = StyleSheet.create({
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
  },
  showMoreText: {
    color: BaseColors.blueDark,
    fontSize: 14,
    fontWeight: '600',
  },
})
