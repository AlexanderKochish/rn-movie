import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

type Props = {
  size?: 'small' | 'large'
}

const Preloader = ({ size = 'large' }: Props) => {
  const { theme } = useTheme()
  return (
    <View
      style={[
        globalStyles.container,
        { backgroundColor: Colors[theme].background },
      ]}
    >
      <ActivityIndicator size={size} />
    </View>
  )
}

export default Preloader
