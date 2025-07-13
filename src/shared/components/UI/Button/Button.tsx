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

type CustomButtonProps = {
  title: string
  onPress?: (event: GestureResponderEvent) => void
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: keyof typeof MaterialCommunityIcons.glyphMap
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  icon,
}) => {
  const backgroundColor = {
    primary: Colors.dark.btn,
    secondary: Colors.dark.disabled,
    text: 'transparent',
  }[variant]

  const textColor = variant === 'text' ? Colors.dark.btn : '#fff'

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor,
          opacity: disabled ? 0.5 : 1,
          width: fullWidth ? '100%' : undefined,
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
              fontSize: Typography.body.fontSize,
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

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
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
    paddingVertical: 8,
  },
})

export default CustomButton
