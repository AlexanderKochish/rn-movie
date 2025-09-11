import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useFacebookSignIn } from '../../hooks/useFacebookSignIn'
import { useGithubSignIn } from '../../hooks/useGithubSignIn'
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn'

const SocialAuthButtons = () => {
  const { theme } = useTheme()
  const { signInWithGithub } = useGithubSignIn()
  const { signInWithGoogle } = useGoogleSignIn()
  const { signInWithFacebook } = useFacebookSignIn()

  return (
    <View style={styles.btns}>
      <IconButton
        icon={'google'}
        contentStyle={{ backgroundColor: 'rgba(100, 181, 246, 0.1)' }}
        iconColor={BaseColors.yellow}
        size={34}
        onPress={signInWithGoogle}
      />
      <IconButton
        icon={'github'}
        contentStyle={{ backgroundColor: 'rgba(100, 181, 246, 0.1)' }}
        size={34}
        onPress={signInWithGithub}
      />
      <IconButton
        icon={'facebook'}
        contentStyle={{ backgroundColor: 'rgba(100, 181, 246, 0.1)' }}
        iconColor={'blue'}
        size={34}
        onPress={signInWithFacebook}
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
