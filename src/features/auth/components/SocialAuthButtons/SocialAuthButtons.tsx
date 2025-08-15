import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useGithubSignIn } from '../../hooks/useGithubSignIn'

const SocialAuthButtons = () => {
  const { theme } = useTheme()
  const { promptAsync } = useGithubSignIn()
  return (
    <View style={styles.btns}>
      <IconButton
        icon={'google'}
        contentStyle={{ backgroundColor: Colors[theme].input }}
        iconColor={BaseColors.yellow}
        size={34}
      />
      <IconButton
        icon={'github'}
        contentStyle={{ backgroundColor: Colors[theme].input }}
        size={34}
        onPress={() => promptAsync()}
      />
      <IconButton
        icon={'facebook'}
        contentStyle={{ backgroundColor: Colors[theme].input }}
        iconColor={'blue'}
        size={34}
      />
    </View>
  )
}

export default SocialAuthButtons

const styles = StyleSheet.create({
  btns: {
    flexDirection: 'row',
    gap: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
})
