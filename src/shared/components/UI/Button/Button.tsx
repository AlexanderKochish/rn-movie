import React from 'react'
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type ButtonVariant = 'primary' | 'secondary' | 'text'
type ButtonSize = 'small' | 'regular' | 'large'

type CustomButtonProps = {
  title: string
  onPress?: (event: GestureResponderEvent) => void
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: keyof typeof MaterialCommunityIcons.glyphMap
  size?: ButtonSize
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  icon,
  size = 'regular',
}) => {
  const backgroundColor = {
    primary: Colors.dark.btn,
    secondary: Colors.dark.disabled,
    text: 'transparent',
  }[variant]

  const textColor = variant === 'text' ? Colors.dark.btn : '#fff'

  const sizeStyle = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 12,
    },
    regular: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontSize: 14,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  }[size]

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor,
          opacity: disabled || loading ? 0.6 : 1,
          width: fullWidth ? '100%' : undefined,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
        },
        variant === 'text' && styles.textButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={18}
              color={textColor}
              style={{ marginRight: 6 }}
            />
          )}
          <Text
            style={{
              color: textColor,
              fontFamily: Typography.body.fontFamily,
              fontSize: sizeStyle.fontSize,
              fontWeight: 'bold',
            }}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButton: {
    backgroundColor: 'transparent',
  },
})
