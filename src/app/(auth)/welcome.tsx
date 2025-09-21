import OAuthButton from '@/src/features/auth/components/OAuthBotton/OAuthButton'
import { useAuthWithOAuth } from '@/src/features/auth/hooks/useAuthWithOAuth'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'

const WelcomeImage = require('../../../assets/images/welcome.png')
const Logo = require('../../../assets/images/logo-white.png')

export default function WelcomeScreen() {
  const { theme, getThemeGradient } = useTheme()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const { handleSignInWitOAuth } = useAuthWithOAuth()

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, slideAnim])

  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <ImageBackground
        source={WelcomeImage}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <LinearGradient
          colors={getThemeGradient(theme)}
          style={styles.backgroundOverlay}
        />

        <View style={styles.overlay}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Image
              source={Logo}
              style={styles.logo}
              tintColor={Colors[theme].text}
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text style={[styles.title, { color: Colors[theme].text }]}>
              Watcher
            </Text>
            <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
              Your Ticket to Screen Satisfaction:{'\n'}Rate, Review, Reel in the
              Best!
            </Text>
          </Animated.View>
        </View>
      </ImageBackground>

      <Animated.View
        style={[
          styles.bottomContainer,
          { backgroundColor: Colors[theme].background },
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.oauthContainer}>
          <Text
            style={[styles.oauthTitle, { color: Colors[theme].textSecondary }]}
          >
            Continue with
          </Text>
          <OAuthButton
            icon="logo-google"
            text="Continue with Google"
            onPress={() => handleSignInWitOAuth('google')}
            iconColor="#DB4437"
            textColor="#1F2937"
            btnShadowColor="#DB4437"
            // disabled={!termsAccepted}
          />
          <OAuthButton
            icon="logo-github"
            text="Continue with Github"
            onPress={() => handleSignInWitOAuth('github')}
            iconColor="#000000"
            textColor="#1F2937"
            btnShadowColor="#000000"
            // disabled={!termsAccepted}
          />

          <OAuthButton
            icon="logo-facebook"
            text="Continue with Facebook"
            onPress={() => handleSignInWitOAuth('facebook')}
            iconColor="#1877F2"
            textColor="#1F2937"
            btnShadowColor="#1877F2"
            // disabled={!termsAccepted}
          />
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  imageBackground: {
    height: 500,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 2,
    marginBottom: 35,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 12,
    fontFamily: 'Inter-ExtraBold',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.3,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 18,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  oauthContainer: {
    marginBottom: 50,
  },
  oauthTitle: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.5,
    opacity: 0.8,
  },
})
