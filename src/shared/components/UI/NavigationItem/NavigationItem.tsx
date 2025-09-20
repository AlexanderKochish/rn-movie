import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

type IoniconsIcons = ComponentProps<typeof Ionicons>['name']

type Props = {
  onOpenLink: () => void
  leftIcon: IoniconsIcons
  rightIcon?: IoniconsIcons
  text: string
}

const NavigationItem = ({
  onOpenLink,
  leftIcon,
  rightIcon = 'arrow-forward',
  text,
}: Props) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.legalLink,
        {
          backgroundColor: Colors[theme].background,
          borderColor: Colors[theme].border,
        },
      ]}
      onPress={onOpenLink}
    >
      {leftIcon && <Ionicons name={leftIcon} size={20} color="#007AFF" />}
      <Text style={[styles.legalLinkText, { color: Colors[theme].text }]}>
        {text}
      </Text>
      {rightIcon && <Ionicons name={rightIcon} size={16} color="#666" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  legalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
  },
  legalLinkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
})
export default NavigationItem
