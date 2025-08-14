import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Href, Link } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  link: Href
  text: string
  linkTag: string
}

const AuthRedirectText = ({ link, text, linkTag }: Props) => {
  const { theme } = useTheme()
  return (
    <View>
      <Text variant="titleMedium" style={{ color: Colors[theme].text }}>
        {text}{' '}
        <Link href={link} style={styles.link}>
          {linkTag}
        </Link>
      </Text>
    </View>
  )
}

export default AuthRedirectText

const styles = StyleSheet.create({
  link: {
    textAlign: 'right',
    color: Colors.dark.btn,
    fontSize: 18,
  },
})
