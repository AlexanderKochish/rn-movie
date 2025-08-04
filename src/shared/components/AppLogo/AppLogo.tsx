import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { BaseColors, Colors } from '../../styles/Colors'
import { Typography } from '../../styles/Typography'
const logo = require('../../../../assets/images/logo.png')

type Props = {
  text?: string
  variant?: 'horizontal' | 'vertical'
  size?: 'small' | 'regular'
  color?: 'white' | 'orange'
}

const AppLogo = ({
  text,
  variant = 'vertical',
  color = 'orange',
  size = 'regular',
}: Props) => {
  return (
    <View style={variant === 'vertical' ? styles.logo : styles.logoHorizontal}>
      <Image
        source={logo}
        style={size === 'regular' ? styles.img : styles.imgSmall}
      />
      <Text style={color === 'orange' ? styles.textLarge : styles.text}>
        {text}
      </Text>
    </View>
  )
}

export default AppLogo

const styles = StyleSheet.create({
  text: {
    color: Colors.dark.text,
    fontSize: Typography.body.fontSize,
    fontWeight: '800',
  },
  logo: {
    alignItems: 'center',
  },
  imgSmall: {
    width: 56,
    height: 56,
  },
  img: {
    width: 119,
    height: 119,
  },
  textLarge: {
    color: BaseColors.orange,
    fontSize: Typography.title.fontSize,
    fontWeight: '800',
  },
  logoHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
})
