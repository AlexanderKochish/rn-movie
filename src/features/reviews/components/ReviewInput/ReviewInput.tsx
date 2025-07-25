import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

const ReviewInput = () => {
  return (
    <TextInput
      multiline
      numberOfLines={5}
      placeholder="Type your review here"
      mode="outlined"
      textAlignVertical="top"
      textColor={Colors.dark.text}
      contentStyle={{
        textAlignVertical: 'top',
      }}
      style={styles.primary}
      theme={{
        colors: {
          text: Colors.dark.text,
          placeholder: '#999',
        },
      }}
    />
  )
}

export default ReviewInput

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.dark.input,
    height: 80,
    marginVertical: 15,
  },
})
