import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
// @ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   // apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//   // authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   // projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//   // storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   // messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   // appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
// }

const firebaseConfig = {
  apiKey: 'AIzaSyDg55xD1SQEeSekjvde-lEZ-l87dleX3nk',
  authDomain: 'expo-test-dbcc2.firebaseapp.com',
  projectId: 'expo-test-dbcc2',
  storageBucket: 'expo-test-dbcc2.firebasestorage.app',
  messagingSenderId: '1080651005635',
  appId: '1:1080651005635:web:799c4b8f57dd3cb7c7ac76',
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)
