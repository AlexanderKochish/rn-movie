import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NoMoreResults = () => {
  return (
    <View style={styles.noMoreResults}>
      <Text style={styles.noMoreText}>No more movies to load</Text>
    </View>
  )
}

export default NoMoreResults

const styles = StyleSheet.create({
  noMoreResults: {
    alignItems: 'center',
    padding: 20,
  },
  noMoreText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
})
