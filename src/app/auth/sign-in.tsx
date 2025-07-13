import AuthRedirectText from '@/src/features/auth/components/AuthRedirectLink/AuthRedirectLink'
import SocialAuthButtons from '@/src/features/auth/components/SocialAuthButtons/SocialAuthButtons'
import AppLogo from '@/src/shared/components/AppLogo/AppLogo'
import PseudoElement from '@/src/shared/components/PseudoElement/PseudoElement'
import { auth } from '@/src/shared/services/firebase'
import { Colors } from '@/src/shared/styles/Colors'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const signIn = async () => {
    const { user } = await auth.signInWithEmailAndPassword(email, password)

    const token = await user.getIdToken()
    if (!token) {
      Alert.alert('User not found')
    } else {
      router.push('/')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppLogo text="Login" />
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          style={{ backgroundColor: '#1F1F1F', color: '#fff' }}
          left={<TextInput.Icon icon={'email'} color={'#fff'} />}
          textColor="#fff"
          keyboardType="email-address"
          label={'Email address'}
          placeholderTextColor={'#fff'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          theme={{
            colors: {
              primary: '#fff',
              onSurface: '#fff',
              placeholder: '#fff',
              text: '#fff',
            },
          }}
        />
        <TextInput
          style={{ backgroundColor: '#1F1F1F', color: '#fff' }}
          keyboardType="visible-password"
          textColor="#fff"
          theme={{
            colors: {
              primary: '#fff',
              placeholder: '#fff',
              text: '#fff',
              onSurface: '#fff',
            },
          }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          left={<TextInput.Icon icon={'lock'} color={'#fff'} />}
          label={'Password'}
        />
        <Link style={styles.link} href={'/auth/sign-up'}>
          Forgot password?
        </Link>
        <Button
          onPress={signIn}
          labelStyle={{ fontSize: 18 }}
          textColor="#fff"
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
        <Text style={styles.regularText}>Or continue with</Text>
      </PseudoElement>
      <SocialAuthButtons />
      <AuthRedirectText
        link="/auth/sign-up"
        text="Don`t have an account?"
        linkTag="Sign Up"
      />
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
    gap: 20,
  },
  regularText: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '800',
  },
  link: {
    textAlign: 'right',
    color: Colors.dark.btn,
    fontSize: 16,
  },
  text: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: '800',
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
