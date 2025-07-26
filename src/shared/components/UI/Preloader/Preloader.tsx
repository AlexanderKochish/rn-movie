import { globalStyles } from '@/src/shared/styles/globalStyles'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type Props = {
  size?: 'small' | 'large'
}

const Preloader = ({ size = 'large' }: Props) => {
  return (
    <View
      style={[
        globalStyles.container,
        { backgroundColor: Colors.dark.background },
      ]}
    >
      <ActivityIndicator size={size} />
    </View>
  )
}

export default Preloader

const styles = StyleSheet.create({})
