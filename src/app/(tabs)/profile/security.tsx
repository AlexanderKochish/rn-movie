import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SecurityScreen = () => {
  return (
    <View style={styles.container}>
      <Text>security</Text>
    </View>
  )
}

export default SecurityScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
