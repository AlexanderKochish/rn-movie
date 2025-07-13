import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/Colors'
type Props = {
  text?: string
}
const AppLogo = ({ text }: Props) => {
  return (
    <View style={styles.logo}>
      <Image source={require('../../../../assets/images/logo.png')} />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default AppLogo

const styles = StyleSheet.create({
  text: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: '800',
  },
  logo: {
    alignItems: 'center',
  },
})
