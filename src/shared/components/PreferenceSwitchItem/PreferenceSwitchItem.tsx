import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, View } from 'react-native'
import { MD3TypescaleKey, Switch, Text } from 'react-native-paper'
import { BaseColors } from '../../styles/Colors'

type Props = {
  icon?: ComponentProps<typeof Ionicons>['name']
  iconSize?: number
  title: string
  titleSize?: keyof typeof MD3TypescaleKey
  showSwitch?: boolean
  value?: boolean
  onChangeValue?: (val: boolean) => void
  disabled?: boolean
  error?: boolean
}

const PreferenceSwitchItem = ({
  icon,
  iconSize = 24,
  title,
  titleSize,
  showSwitch = true,
  value,
  onChangeValue,
  disabled,
  error,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Ionicons name={icon} size={iconSize} color={'#ffffff'} />
        <Text variant={titleSize}>{title}</Text>
      </View>
      {showSwitch && (
        <Switch
          value={value}
          onValueChange={onChangeValue}
          disabled={disabled}
        />
      )}
      {error && (
        <Ionicons
          name="alert-circle"
          size={20}
          color={BaseColors.red}
          style={styles.errorIcon}
        />
      )}
    </View>
  )
}

export default PreferenceSwitchItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  errorIcon: {
    marginLeft: 8,
  },
})
