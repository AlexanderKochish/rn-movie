import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { Colors } from '../../styles/Colors'
type Props = {
  text: string
}
const TermsCheckbox = ({ text }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Checkbox status="checked" color={Colors.dark.btn} />
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default TermsCheckbox

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.dark.text,
    fontSize: 16,
  },
})
