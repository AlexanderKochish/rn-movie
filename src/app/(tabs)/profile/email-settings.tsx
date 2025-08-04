import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const EmailSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>email settings</Text>
    </View>
  )
}

export default EmailSettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
