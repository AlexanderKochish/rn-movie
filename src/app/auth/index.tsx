import CustomButton from '@/src/shared/components/UI/Button/Button'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const AuthTitleImage = require('../../../assets/images/auth-image.png')
const Logo = require('../../../assets/images/logo-white.png')

export default function AuthIndex() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={AuthTitleImage}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>Watcher</Text>
          <Text style={styles.subtitle}>
            Your Ticket to Screen Satisfaction:{'\n'}Rate, Review, Reel in the
            Best!
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <CustomButton title="Sign Up" fullWidth variant="primary" />

        <Text style={styles.bottomText}>I already have an account</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  imageBackground: {
    height: 580,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 115,
    height: 115,
    resizeMode: 'contain',
  },
  title: {
    color: Colors.dark.text,
    fontSize: 54,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  bottomText: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
    fontWeight: 'bold',
  },
})
