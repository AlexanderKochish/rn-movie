import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, MD3TypescaleKey, Switch, Text } from 'react-native-paper'

type Props = {
  icon?: string
  iconSize?: number
  title: string
  titleSize?: keyof typeof MD3TypescaleKey
  showSwitch?: boolean
  value?: boolean
  onChangeValue?: () => void
}

const PreferenceSwitchItem = ({
  icon,
  iconSize = 24,
  title,
  titleSize,
  showSwitch = true,
  value,
  onChangeValue,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Icon source={icon} size={iconSize} />
        <Text variant={titleSize}>{title}</Text>
      </View>
      {showSwitch && <Switch value={value} onChange={onChangeValue} />}
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
})
