import AuthRedirectText from '@/src/features/auth/components/AuthRedirectLink/AuthRedirectLink'
import SocialAuthButtons from '@/src/features/auth/components/SocialAuthButtons/SocialAuthButtons'
import { useSignUp } from '@/src/features/auth/hooks/useSignUp'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import AppLogo from '@/src/shared/components/AppLogo/AppLogo'
import PseudoElement from '@/src/shared/components/PseudoElement/PseudoElement'
import TermsCheckbox from '@/src/shared/components/TermsCheckbox/TermsCheckbox'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUpScreen = () => {
  const { control, handleSubmit } = useSignUp()
  const { theme } = useTheme()

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors[theme].background }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AppLogo text="Create an account" />
        <View style={styles.form}>
          <ControlledTextInput
            control={control}
            name="username"
            mode="outlined"
            left={
              <TextInput.Icon icon={'account'} color={Colors[theme].text} />
            }
            label={'Username'}
            placeholderTextColor={Colors[theme].text}
          />
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
          <TermsCheckbox text="Accept terms and condition" />
          <Button
            labelStyle={{ fontSize: 18 }}
            textColor={BaseColors.white}
            style={styles.btn}
            onPress={handleSubmit}
          >
            Sign Up
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
          link="/(auth)/sign-in"
          text="Already have an account? "
          linkTag="Log in"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUpScreen

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
  input: {
    backgroundColor: Colors.dark.input,
    color: '#fff',
  },
})
