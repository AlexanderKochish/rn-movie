import AuthRedirectText from '@/src/features/auth/components/AuthRedirectLink/AuthRedirectLink'
import SocialAuthButtons from '@/src/features/auth/components/SocialAuthButtons/SocialAuthButtons'
import { useSignUp } from '@/src/features/auth/hooks/useSignUp'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import AppLogo from '@/src/shared/components/AppLogo/AppLogo'
import PseudoElement from '@/src/shared/components/PseudoElement/PseudoElement'
import TermsCheckbox from '@/src/shared/components/TermsCheckbox/TermsCheckbox'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { BaseColors } from '@/src/shared/styles/Colors'
import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUpScreen = () => {
  const { control, handleSubmit } = useSignUp()
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AppLogo text="Create an account" />
          <View style={[styles.form, isDark && styles.darkForm]}>
            <ControlledTextInput
              control={control}
              name="username"
              mode="outlined"
              left={
                <TextInput.Icon
                  icon={'account'}
                  color={isDark ? '#64b5f6' : '#007AFF'}
                />
              }
              label={'Username'}
              placeholderTextColor={isDark ? '#888' : '#666'}
              outlineColor={isDark ? '#333' : '#ddd'}
              activeOutlineColor={isDark ? '#64b5f6' : '#007AFF'}
              textColor={isDark ? '#fff' : '#000'}
              style={styles.input}
            />
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

            <TermsCheckbox
              text="Accept terms and conditions"
              // textStyle={{ color: isDark ? '#b0b0b0' : '#666' }}
              // checkboxColor={isDark ? '#64b5f6' : '#007AFF'}
            />

            <Button
              labelStyle={styles.buttonLabel}
              textColor={BaseColors.white}
              style={[styles.btn, isDark && styles.darkBtn]}
              onPress={handleSubmit}
              mode="contained"
            >
              Sign Up
            </Button>
          </View>

          <PseudoElement
            containerStyle={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
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
            link="/(auth)/sign-in"
            text="Already have an account? "
            linkTag="Log in"
            // textStyle={{ color: isDark ? '#b0b0b0' : '#666' }}
            // linkStyle={{ color: isDark ? '#64b5f6' : '#007AFF' }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 10,
  },
  form: {
    width: '100%',
    gap: 5,
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
