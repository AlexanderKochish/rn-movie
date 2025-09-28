import { MovieDetailsType } from '@/src/features/movie/types/types'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

type Props<T extends MovieDetailsType> = {
  onPress: (data: T) => void
  data: T
  isLoading: boolean
  isActive: boolean | undefined
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
      <IconButton
        icon={({ size, color }) => (
          <Ionicons name={iconName} size={size} color={color} />
        )}
        size={24}
        iconColor={isActive ? '#ff0000' : Colors[theme].text}
        contentStyle={[
          styles.actionButton,
          { backgroundColor: Colors[theme].actionBtn },
        ]}
        onPress={() => onPress(data)}
        disabled={isLoading}
      />
    </Animated.View>
  )
}

export default IconToggleButton

const styles = StyleSheet.create({
  actionButton: {
    padding: 8,
    borderRadius: 20,
  },
})
