import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  title?: string
  subtitle?: string
}

const Footer = ({
  title = 'Made with ❤️ using TMDB API',
  subtitle = '© 2025 Watcher, Inc.',
}: Props) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{title}</Text>
      <Text style={styles.footerText}>{subtitle}</Text>
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
