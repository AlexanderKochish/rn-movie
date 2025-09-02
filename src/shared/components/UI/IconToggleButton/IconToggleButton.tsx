import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { MovieDetailsType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

type Props<T extends MovieDetailsType> = {
  onPress: (data: T) => void
  data: T
  isLoading: boolean
  isActive: boolean
  icon: ComponentProps<typeof Ionicons>['name']
}

const IconToggleButton = <T extends MovieDetailsType>({
  data,
  isActive,
  isLoading,
  onPress,
  icon,
}: Props<T>) => {
  const { theme } = useTheme()
  const scale = useSharedValue(1)

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const iconName = isActive
    ? icon
    : (`${icon}-outline` as ComponentProps<typeof Ionicons>['name'])
  return (
    <Animated.View style={animatedHeartStyle}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onPress(data)}
        disabled={isLoading}
      >
        <Ionicons
          name={iconName}
          size={24}
          color={isActive ? '#ff0000' : '#ffffff'}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default IconToggleButton

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
})
