import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type ButtonProps = {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'text'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  style?: ViewStyle
}

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}: ButtonProps) => {
  const getBackgroundColor = () => {
    if (variant === 'primary') return Colors.dark.btn
    if (variant === 'secondary') return Colors.dark.disabled
    return 'transparent'
  }

  const getTextColor = () => {
    if (variant === 'text') return Colors.dark.btn
    return '#fff'
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={{
            color: getTextColor(),
            fontSize: Typography.body.fontSize,
            fontFamily: Typography.body.fontFamily,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
