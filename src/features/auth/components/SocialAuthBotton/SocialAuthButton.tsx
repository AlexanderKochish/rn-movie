import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const icons = {
  google: require('../../../../assets/images/google-icon.png'),
  facebook: require('../../../../assets/images/facebook-icon.png'),
  apple: require('../../../../assets/images/apple-icon.png'),
}

type Props = {
  imageUrl: keyof typeof icons
  onPress: () => void
}

const SocialAuthButton = ({ imageUrl, onPress }: Props) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={styles.button}
      contentStyle={styles.content}
    >
      <Image source={icons[imageUrl]} style={styles.image} />
    </Button>
  )
}

export default SocialAuthButton

const styles = StyleSheet.create({
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
    backgroundColor: '#1F1F1F',
  },
})
