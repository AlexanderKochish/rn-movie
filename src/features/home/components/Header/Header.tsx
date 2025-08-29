import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

const HEADER_HEIGHT = 120

const Header = () => {
  const router = useRouter()
  const scrollY = useRef(new Animated.Value(0)).current
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const navigateToSearch = () => {
    router.push('/search')
  }

  return (
    <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
      <BlurView intensity={80} style={styles.blurHeader}>
        <Text style={styles.headerTitle}>MovieApp</Text>
        <TouchableOpacity onPress={navigateToSearch}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </BlurView>
    </Animated.View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 100,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  blurHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
