import { ImageStyle } from 'expo-image'
import React, { ReactNode } from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

type RNStyle = ViewStyle | TextStyle | ImageStyle

type StyleProps<
  B extends RNStyle = ViewStyle,
  A extends RNStyle = ViewStyle,
  C extends RNStyle = ViewStyle,
> = {
  beforeStyle?: B
  afterStyle?: A
  containerStyle?: C
} & { children: ReactNode }

const PseudoElement = ({
  children,
  beforeStyle,
  afterStyle,
  containerStyle,
}: StyleProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {beforeStyle && <View style={[styles.before, beforeStyle]} />}
      {children}
      {afterStyle && <View style={[styles.after, afterStyle]} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  before: {
    position: 'absolute',
  },
  after: {
    position: 'absolute',
  },
})

export default PseudoElement
