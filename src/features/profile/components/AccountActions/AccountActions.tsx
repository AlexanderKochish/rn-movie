import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AccountActions = () => {
  const router = useRouter()
  const { theme } = useTheme()
  return (
    <View
      style={[styles.dangerSection, { backgroundColor: Colors[theme].stats }]}
    >
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Account Actions
      </Text>

      <TouchableOpacity
        style={[styles.dangerButton, styles.deleteButton]}
        onPress={() => router.push('/delete-account')}
      >
        <Ionicons name="trash" size={20} color={BaseColors.red} />
        <Text style={[styles.dangerButtonText, styles.deleteButtonText]}>
          Delete Account
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  )
}

export default AccountActions

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dangerSection: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    gap: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    gap: 12,
  },
  dangerButtonText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButton: {
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  deleteButtonText: {
    color: '#FF3B30',
  },
})
