import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { MovieDetailsType } from '@/src/shared/types/types'
import React from 'react'
import { Pressable } from 'react-native'
import { Icon } from 'react-native-paper'

type IconName = 'star' | 'bookmark'

type Props<T extends MovieDetailsType> = {
  onPress: (data: T) => void
  data: T
  isLoading: boolean
  isActive: boolean
  icon: IconName
}

const IconToggleButton = <T extends MovieDetailsType>({
  data,
  isActive,
  isLoading,
  onPress,
  icon,
}: Props<T>) => {
  const { theme } = useTheme()
  return (
    <Pressable onPress={() => onPress(data)} disabled={isLoading}>
      <Icon
        source={isActive ? icon : `${icon}-outline`}
        size={24}
        color={isActive ? BaseColors.yellow : Colors[theme].text}
      />
    </Pressable>
  )
}

export default IconToggleButton
