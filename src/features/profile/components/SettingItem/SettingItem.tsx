import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  icon?: string
  onPress: () => void
  settingName: string
}

const SettingItem = ({ settingName, onPress, icon }: Props) => {
  const { theme } = useTheme()
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={styles.titleWrapper}>
        <Icon source={icon} size={24} color={Colors[theme].text} />
        <Text style={[styles.title, { color: Colors[theme].text }]}>
          {settingName}
        </Text>
      </View>
      <Icon source={'chevron-right'} size={24} color={Colors[theme].text} />
    </Pressable>
  )
}

export default SettingItem

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontSize: Typography.title.fontSize,
  },
})
