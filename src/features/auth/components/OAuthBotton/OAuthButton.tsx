import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { ColorValue, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

type IonicIconsName = ComponentProps<typeof Ionicons>['name']

type Props = {
  onPress: () => void
  icon: Extract<IonicIconsName, 'logo-google' | 'logo-github' | 'logo-facebook'>
  iconColor?: ColorValue
  btnShadowColor?: ColorValue
  textColor?: ColorValue
  text: string
  disabled?: boolean
}

const OAuthButton = ({
  onPress,
  icon,
  iconColor,
  btnShadowColor,
  textColor,
  text,
  disabled,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.oauthButton,
        disabled && styles.disabled,
        { shadowColor: btnShadowColor },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.buttonContent}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
          <Ionicons name={icon} size={20} color="#FFFFFF" />
        </View>
        <Text style={[styles.oauthButtonText, { color: textColor }]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default OAuthButton

const styles = StyleSheet.create({
  oauthButton: {
    height: 58,
    borderRadius: 18,
    marginBottom: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 0,
    overflow: 'hidden',
  },
  disabled: {
    backgroundColor: '#e8e8e8ff',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  oauthButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
  },
})
