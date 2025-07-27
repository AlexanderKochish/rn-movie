import { StyleSheet } from 'react-native'
import { Typography } from './Typography'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: Typography.title.fontSize,
    fontWeight: '700',
  },
})
