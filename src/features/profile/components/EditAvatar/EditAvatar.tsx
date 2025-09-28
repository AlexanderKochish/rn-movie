import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

type Props = {
  avatar?: string
  isLoading: boolean
  handlePickImage: () => Promise<void>
}

const EditAvatar = ({ avatar, handlePickImage, isLoading }: Props) => {
  const { theme } = useTheme()
  return (
    <View
      style={[
        styles.avatarSection,
        {
          backgroundColor: Colors[theme].input,
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        {isLoading ? (
          <View style={styles.avatarPlaceholder}>
            <ActivityIndicator size="large" color={BaseColors.blueDark} />
          </View>
        ) : avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.changeAvatarButton,
            { borderColor: Colors[theme].border },
          ]}
          onPress={handlePickImage}
          disabled={isLoading}
        >
          <Ionicons name="camera" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.avatarLabel, { color: Colors[theme].text }]}>
        Profile Photo
      </Text>

      <View style={styles.avatarActions}>
        <TouchableOpacity
          style={styles.avatarActionButton}
          onPress={handlePickImage}
          disabled={isLoading}
        >
          <Ionicons name="image" size={16} color={BaseColors.blueDark} />
          <Text style={styles.avatarActionText}>Choose from Library</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarActionButton}
          onPress={handlePickImage}
          disabled={isLoading}
        >
          <Ionicons name="camera" size={16} color={BaseColors.blueDark} />
          <Text style={styles.avatarActionText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditAvatar

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1a1a1a',
  },
  avatarLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  avatarActions: {
    flexDirection: 'row',
    gap: 16,
  },
  avatarActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  avatarActionText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
})
