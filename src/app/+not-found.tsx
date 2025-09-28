import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppLogo from '../shared/components/AppLogo/AppLogo'
import { BaseColors } from '../shared/styles/Colors'

export default function NotFoundScreen() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, slideAnim])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[BaseColors.black, BaseColors.lightBlack, BaseColors.black]}
        style={styles.background}
      >
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <IconButton
              onPress={() => router.back()}
              icon="arrow-left"
              size={24}
              iconColor={BaseColors.white}
              style={styles.backButton}
            />
            <View style={styles.headerRight} />
          </View>

          <View style={styles.mainContent}>
            <Animated.View
              style={[
                styles.animationContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <AppLogo />

              <View style={styles.errorIcon}>
                <Text style={styles.errorEmoji}>🎬</Text>
                <View style={styles.errorCircle}>
                  <Text style={styles.errorText}>?</Text>
                </View>
              </View>

              <Text style={styles.title}>Movie Not Found</Text>

              <Text style={styles.description}>
                Unfortunately, we couldn&apos;t find any{'\n'}
                movies matching your search
              </Text>

              <View style={styles.suggestions}>
                <Text style={styles.suggestionsTitle}>Try the following:</Text>
                <View style={styles.suggestionItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.suggestionText}>Check your spelling</Text>
                </View>
                <View style={styles.suggestionItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.suggestionText}>
                    Use different keywords
                  </Text>
                </View>
                <View style={styles.suggestionItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.suggestionText}>
                    Browse popular movies
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>

          <Animated.View
            style={[
              styles.actions,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Button
              mode="contained"
              onPress={() => router.back()}
              style={styles.primaryButton}
              labelStyle={styles.primaryButtonLabel}
              contentStyle={styles.buttonContent}
            >
              Back to Search
            </Button>
            <Button
              mode="outlined"
              onPress={() => router.push('/')}
              style={styles.secondaryButton}
              labelStyle={styles.secondaryButtonLabel}
              contentStyle={styles.buttonContent}
            >
              Go to Home
            </Button>
          </Animated.View>
        </SafeAreaView>

        <View style={styles.decorativeTop} />
        <View style={styles.decorativeBottom} />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.black,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    margin: 0,
    backgroundColor: BaseColors.grayLight,
  },
  logo: {
    color: BaseColors.orange,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 40,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  animationContainer: {
    alignItems: 'center',
    width: '100%',
  },
  filmReel: {
    alignItems: 'center',
    marginBottom: 40,
  },
  reel: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BaseColors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 3,
    borderColor: BaseColors.orange,
  },
  reelHole: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BaseColors.gray,
  },
  reelSpokes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  spoke: {
    position: 'absolute',
    width: 3,
    height: 40,
    backgroundColor: BaseColors.gray,
    top: 0,
    left: '50%',
    marginLeft: -1.5,
  },
  filmStrip: {
    width: 120,
    height: 4,
    backgroundColor: BaseColors.orange,
    marginTop: 10,
    position: 'relative',
  },
  filmPerforation: {
    position: 'absolute',
    top: -3,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  perforation: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BaseColors.darkGray,
  },
  errorIcon: {
    position: 'relative',
    marginBottom: 24,
  },
  errorEmoji: {
    fontSize: 64,
  },
  errorCircle: {
    position: 'absolute',
    right: -5,
    top: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BaseColors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BaseColors.white,
  },
  errorText: {
    color: BaseColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: BaseColors.white,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: BaseColors.secondaryDark,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  suggestions: {
    width: '100%',
    backgroundColor: BaseColors.inputBackground,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: BaseColors.borderGray,
  },
  suggestionsTitle: {
    color: BaseColors.orange,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    color: BaseColors.orange,
    fontSize: 16,
    marginRight: 8,
    lineHeight: 20,
  },
  suggestionText: {
    color: BaseColors.secondaryDark,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  actions: {
    padding: 24,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: BaseColors.orange,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: BaseColors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonLabel: {
    color: BaseColors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderColor: BaseColors.orange,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  secondaryButtonLabel: {
    color: BaseColors.orange,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonContent: {
    height: 52,
  },
  decorativeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: BaseColors.orangeOpacity,
  },
  decorativeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: BaseColors.orangeOpacity,
  },
})
