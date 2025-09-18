import { useAuthWithOAuth } from '@/src/features/auth/hooks/useAuthWithOAuth'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
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
  const { theme, getThemeGradient } = useTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const { signInWithOAuth } = useAuthWithOAuth()

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
            <Image source={Logo} style={styles.logo} tintColor="#FFFFFF" />
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text style={styles.title}>Watcher</Text>
            <Text style={styles.subtitle}>
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

          <TouchableOpacity
            style={[styles.oauthButton, styles.googleButton]}
            onPress={() => signInWithOAuth('google')}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.iconContainer, styles.googleIcon]}>
                <Ionicons name="logo-google" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.oauthButtonText, styles.googleText]}>
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.oauthButton, styles.githubButton]}
            onPress={() => signInWithOAuth('github')}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.iconContainer, styles.githubIcon]}>
                <Ionicons name="logo-github" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.oauthButtonText, styles.githubText]}>
                Continue with GitHub
              </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[styles.oauthButton, styles.facebookButton]}
            onPress={() => handleOAuthSignIn('facebook')}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.iconContainer, styles.facebookIcon]}>
                <Ionicons name="logo-facebook" size={20} color="#FFFFFF" />
              </View>
              <Text style={[styles.oauthButtonText, styles.facebookText]}>
                Continue with Facebook
              </Text>
            </View>
          </TouchableOpacity> */}
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
    marginBottom: 10,
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
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.3,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 18,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 0,
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
    marginBottom: 10,
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
  oauthButton: {
    height: 58,
    borderRadius: 18,
    marginBottom: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 0,
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleIcon: {
    backgroundColor: '#DB4437',
  },
  githubIcon: {
    backgroundColor: '#000000',
  },
  facebookIcon: {
    backgroundColor: '#1877F2',
  },
  oauthButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
  },
  googleButton: {
    shadowColor: '#DB4437',
  },
  googleText: {
    color: '#1F2937',
  },
  githubButton: {
    shadowColor: '#000000',
  },
  githubText: {
    color: '#1F2937',
  },
  facebookButton: {
    shadowColor: '#1877F2',
  },
  facebookText: {
    color: '#1F2937',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.2,
  },
  dividerText: {
    marginHorizontal: 20,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    opacity: 0.6,
    letterSpacing: 0.5,
  },
  emailButton: {
    borderRadius: 18,
    height: 58,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.3,
  },
  signInLink: {
    marginTop: 24,
    padding: 12,
    borderRadius: 12,
  },
  signInHighlight: {
    color: '#6366F1',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
})
