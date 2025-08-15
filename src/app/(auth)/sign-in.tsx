import AuthRedirectText from '@/src/features/auth/components/AuthRedirectLink/AuthRedirectLink'
import SocialAuthButtons from '@/src/features/auth/components/SocialAuthButtons/SocialAuthButtons'
import { useSignIn } from '@/src/features/auth/hooks/useSignIn'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import AppLogo from '@/src/shared/components/AppLogo/AppLogo'
import PseudoElement from '@/src/shared/components/PseudoElement/PseudoElement'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Link } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignInScreen = () => {
  const { control, handleSubmit } = useSignIn()
  const { theme } = useTheme()

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors[theme].background }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AppLogo text="Login" />
        <View style={styles.form}>
          <ControlledTextInput
            control={control}
            name="email"
            mode="outlined"
            left={<TextInput.Icon icon={'email'} color={Colors[theme].text} />}
            keyboardType="email-address"
            label={'Email address'}
            placeholderTextColor={Colors[theme].text}
          />
          <ControlledTextInput
            control={control}
            name="password"
            keyboardType="visible-password"
            textColor={Colors[theme].text}
            mode="outlined"
            left={<TextInput.Icon icon={'lock'} color={Colors[theme].text} />}
            label={'Password'}
            placeholderTextColor={Colors[theme].text}
          />

          <Link style={styles.link} href={'/(auth)/sign-up'}>
            Forgot password?
          </Link>
          <Button
            onPress={handleSubmit}
            labelStyle={{ fontSize: 18 }}
            textColor={BaseColors.white}
            style={styles.btn}
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
            backgroundColor: 'gray',
          }}
          afterStyle={{
            right: 0,
            width: 100,
            height: 1,
            backgroundColor: 'gray',
          }}
        >
          <Text variant="titleMedium" style={{ color: Colors[theme].text }}>
            Or continue with
          </Text>
        </PseudoElement>
        <SocialAuthButtons />
        <AuthRedirectText
          link="/(auth)/sign-up"
          text="Don`t have an account?"
          linkTag="Sign Up"
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
    gap: 20,
  },
  link: {
    textAlign: 'right',
    color: Colors.dark.btn,
    fontSize: 16,
  },
  form: {
    width: '100%',
    gap: 15,
  },
  btn: {
    backgroundColor: Colors.dark.btn,
    color: Colors.dark.text,
    borderRadius: 4,
    paddingVertical: 4,
  },
})
