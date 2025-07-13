import { Colors } from '@/src/shared/styles/Colors'
import { Href, Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  link: Href
  text: string
  linkTag: string
}

const AuthRedirectText = ({ link, text, linkTag }: Props) => {
  return (
    <View>
      <Text style={styles.regularText}>
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
  regularText: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '800',
  },
  link: {
    textAlign: 'right',
    color: Colors.dark.btn,
    fontSize: 18,
  },
})
