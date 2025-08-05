import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { Href, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Icon, IconButton, MD3TypescaleKey, Text } from 'react-native-paper'

type Props = {
  icon?: string
  onPress?: () => void
  settingName?: string
  titleSize?: keyof typeof MD3TypescaleKey
  link?: Href
}

const NavigationItem = ({
  settingName,
  onPress,
  icon,
  link,
  titleSize = 'titleLarge',
}: Props) => {
  const { theme } = useTheme()
  const router = useRouter()
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={styles.titleWrapper}>
        <Icon source={icon} size={24} color={Colors[theme].text} />
        <Text variant={titleSize}>{settingName}</Text>
      </View>
      {link && (
        <IconButton
          icon={'chevron-right'}
          size={24}
          iconColor={Colors[theme].text}
          onPress={() => router.push(link)}
        />
      )}
    </Pressable>
  )
}

export default NavigationItem

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
    gap: 10,
  },
  title: {
    fontSize: Typography.title.fontSize,
  },
})
