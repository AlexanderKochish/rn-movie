import AuthRedirectText from '@/src/features/auth/components/AuthRedirectLink/AuthRedirectLink'
import SocialAuthButtons from '@/src/features/auth/components/SocialAuthButtons/SocialAuthButtons'
import { useSignIn } from '@/src/features/auth/hooks/useSignIn'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import AppLogo from '@/src/shared/components/AppLogo/AppLogo'
import PseudoElement from '@/src/shared/components/PseudoElement/PseudoElement'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { BaseColors } from '@/src/shared/styles/Colors'
import { Link } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignInScreen = () => {
  const { control, handleSubmit } = useSignIn()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#f8f9fa' }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AppLogo text="Login" />
        <View style={[styles.form, isDark && styles.darkForm]}>
          <ControlledTextInput
            control={control}
            name="email"
            mode="outlined"
            left={
              <TextInput.Icon
                icon={'email'}
                color={isDark ? '#64b5f6' : '#007AFF'}
              />
            }
            keyboardType="email-address"
            label={'Email address'}
            placeholderTextColor={isDark ? '#888' : '#666'}
            outlineColor={isDark ? '#333' : '#ddd'}
            activeOutlineColor={isDark ? '#64b5f6' : '#007AFF'}
            textColor={isDark ? '#fff' : '#000'}
            style={styles.input}
          />
          <ControlledTextInput
            control={control}
            name="password"
            textColor={isDark ? '#fff' : '#000'}
            mode="outlined"
            left={
              <TextInput.Icon
                icon={'lock'}
                color={isDark ? '#64b5f6' : '#007AFF'}
              />
            }
            label={'Password'}
            placeholderTextColor={isDark ? '#888' : '#666'}
            outlineColor={isDark ? '#333' : '#ddd'}
            activeOutlineColor={isDark ? '#64b5f6' : '#007AFF'}
            secureTextEntry
            style={styles.input}
          />

          <Link
            style={[styles.link, isDark && styles.darkLink]}
            href={'/(auth)/forgot-password'}
          >
            Forgot password?
          </Link>
          <Button
            onPress={handleSubmit}
            labelStyle={styles.buttonLabel}
            textColor={BaseColors.white}
            style={[styles.btn, isDark && styles.darkBtn]}
            mode="contained"
          >
            Login
          </Button>
        </View>
        <PseudoElement
          containerStyle={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          beforeStyle={{
            left: 0,
            width: 100,
            height: 1,
            backgroundColor: isDark ? '#333' : '#ddd',
          }}
          afterStyle={{
            right: 0,
            width: 100,
            height: 1,
            backgroundColor: isDark ? '#333' : '#ddd',
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: isDark ? '#b0b0b0' : '#666', fontSize: 14 }}
          >
            Or continue with
          </Text>
        </PseudoElement>
        <SocialAuthButtons />
        <AuthRedirectText
          link="/(auth)/sign-up"
          text="Don't have an account?"
          linkTag="Sign Up"
          // textStyle={{ color: isDark ? '#b0b0b0' : '#666' }}
          // linkStyle={{ color: isDark ? '#64b5f6' : '#007AFF' }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 24,
  },
  form: {
    width: '100%',
    gap: 16,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkForm: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  input: {
    backgroundColor: 'transparent',
  },
  link: {
    textAlign: 'right',
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  darkLink: {
    color: '#64b5f6',
  },
  btn: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 6,
    marginTop: 8,
  },
  darkBtn: {
    backgroundColor: '#64b5f6',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
})
