import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { Typography } from '@/src/shared/styles/Typography'
import { ThemeColorType } from '@/src/shared/types/types'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import {
  ColorValue,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'

const WelcomeImage = require('../../../assets/images/welcome.png')
const Logo = require('../../../assets/images/logo-white.png')

export default function WelcomeScreen() {
  const router = useRouter()
  const { theme } = useTheme()

  const getThemeGradient = (
    theme: ThemeColorType
  ): [ColorValue, ColorValue, ...ColorValue[]] => {
    switch (theme) {
      case 'light':
        return ['transparent', Colors[theme].background]
      case 'dark':
        return ['transparent', Colors[theme].background]
      default:
        return ['transparent', 'rgba(0,0,0,0.8)']
    }
  }
  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <ImageBackground
        source={WelcomeImage}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image
            source={Logo}
            style={styles.logo}
            tintColor={Colors[theme].text}
          />
          <Text style={[styles.title, { color: Colors[theme].text }]}>
            Watcher
          </Text>
          <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
            Your Ticket to Screen Satisfaction:{'\n'}Rate, Review, Reel in the
            Best!
          </Text>
        </View>
        <LinearGradient
          colors={getThemeGradient(theme)}
          style={styles.background}
        />
      </ImageBackground>

      <View
        style={[
          styles.bottomContainer,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <CustomButton
          title="Sign Up"
          fullWidth
          variant="primary"
          onPress={() => router.replace('/(auth)/sign-up')}
        />

        <TouchableOpacity onPress={() => router.replace('/(auth)/sign-in')}>
          <Text style={[styles.bottomText, { color: Colors[theme].text }]}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
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
    zIndex: 1,
  },
  logo: {
    width: 115,
    height: 115,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: Typography.title.fontSize,
    textAlign: 'center',
    lineHeight: 28,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  bottomText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: Typography.title.fontSize,
    fontWeight: 'bold',
  },
})
