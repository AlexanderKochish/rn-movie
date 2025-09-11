import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useProfile } from '../../hooks/useProfile'

const UserInfo = () => {
  const { profile } = useProfile()
  const { theme } = useTheme()
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      }}
      style={styles.headerBackground}
      blurRadius={10}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile?.username.slice(0, 1).toUpperCase() ?? ''}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{profile?.username}</Text>
          <Text style={styles.userEmail}>{profile?.email}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#64b5f6" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  headerBackground: {
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    backdropFilter: 'blur(10px)',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(100, 181, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(100, 181, 246, 0.3)',
  },
  avatarText: {
    color: '#64b5f6',
    fontSize: 28,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#ffffff',
  },
  userEmail: {
    fontSize: 14,
    color: '#b0b0b0',
  },
  editButton: {
    padding: 8,
    backgroundColor: 'rgba(100, 181, 246, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(100, 181, 246, 0.3)',
  },
})
