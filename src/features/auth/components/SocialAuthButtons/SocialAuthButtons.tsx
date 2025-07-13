import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

const SocialAuthButtons = () => {
  return (
    <View style={styles.btns}>
      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={styles.button}
        contentStyle={styles.content}
      >
        <Image
          source={require('../../../../../assets/images/google-icon.png')}
          style={styles.image}
        />
      </Button>
      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={styles.button}
        contentStyle={styles.content}
      >
        <Image
          source={require('../../../../../assets/images/apple-icon.png')}
          style={styles.image}
        />
      </Button>
      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={styles.button}
        contentStyle={styles.content}
      >
        <Image
          source={require('../../../../../assets/images/facebook-icon.png')}
          style={styles.image}
        />
      </Button>
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
    backgroundColor: '#1F1F1F',
  },
})
