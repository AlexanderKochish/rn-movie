import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

type IoniconsIcons = ComponentProps<typeof Ionicons>['name']

type Props = {
  onOpenLink: () => void
  leftIcon: IoniconsIcons
  rightIcon?: IoniconsIcons
  leftIconColor?: string
  text: string
  subText?: string
}

const NavigationItem = ({
  onOpenLink,
  leftIcon,
  rightIcon = 'arrow-forward',
  leftIconColor = '#007AFF',
  text,
  subText,
}: Props) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.legalLink,
        {
          backgroundColor: Colors[theme].stats,
          borderColor: Colors[theme].border,
        },
      ]}
      onPress={onOpenLink}
    >
      {leftIcon && <Ionicons name={leftIcon} size={20} color={leftIconColor} />}
      <View style={styles.textContent}>
        <Text style={[styles.legalLinkText, { color: Colors[theme].text }]}>
          {text}
        </Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>
      {rightIcon && <Ionicons name={rightIcon} size={20} color="#666" />}
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
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    color: '#888',
    fontSize: 12,
  },
  textContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
})
export default NavigationItem
