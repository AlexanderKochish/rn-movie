import { useSignIn } from '@/src/features/auth/hooks/useSignIn'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import AppLogo from '@/src/shared/components/AppLogo/AppLogo'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { BaseColors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgotPasswordScreen = () => {
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={isDark ? '#64b5f6' : '#007AFF'}
              />
            </TouchableOpacity>
          </Link>

          {/* Header */}
          <View style={styles.header}>
            <AppLogo text="Reset Password" />
            <Text style={[styles.subtitle, isDark && styles.darkText]}>
              Enter your email address and we&apos;ll send you instructions to
              reset your password
            </Text>
          </View>

          {/* Form */}
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
              autoCapitalize="none"
            />

            <Button
              onPress={handleSubmit}
              //   loading={isLoading}
              //   disabled={isLoading}
              labelStyle={styles.buttonLabel}
              textColor={BaseColors.white}
              style={[styles.btn, isDark && styles.darkBtn]}
              mode="contained"
              icon={({ size, color }) => (
                <Ionicons name="send" size={size} color={color} />
              )}
            >
              {/* {isLoading ? 'Sending...' : 'Send Instructions'} */}
              Send Instructions
            </Button>
          </View>

          {/* Additional Help */}
          <View style={[styles.helpSection, isDark && styles.darkHelpSection]}>
            <Text style={[styles.helpTitle, isDark && styles.darkText]}>
              Need more help?
            </Text>
            <Text style={[styles.helpText, isDark && styles.darkText]}>
              Contact our support team at{' '}
              <Text style={styles.supportEmail}>support@movieapp.com</Text>
            </Text>
          </View>

          {/* Back to Login */}
          <View style={styles.backToLogin}>
            <Text style={[styles.backToLoginText, isDark && styles.darkText]}>
              Remember your password?{' '}
            </Text>
            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity>
                <Text
                  style={[styles.backToLoginLink, isDark && styles.darkLink]}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(100, 181, 246, 0.1)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
    gap: 20,
    backgroundColor: '#fff',
    padding: 24,
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
  helpSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkHelpSection: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  supportEmail: {
    color: '#007AFF',
    fontWeight: '500',
  },
  backToLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  backToLoginText: {
    fontSize: 14,
    color: '#666',
  },
  backToLoginLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  darkText: {
    color: '#b0b0b0',
  },
  darkLink: {
    color: '#64b5f6',
  },
})
