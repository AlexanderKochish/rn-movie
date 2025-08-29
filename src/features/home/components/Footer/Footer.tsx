import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Made with ❤️ using TMDB API</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 12,
  },
})
