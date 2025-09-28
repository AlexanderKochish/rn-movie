import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AccountActions = () => {
  const { theme } = useTheme()
  return (
    <View
      style={[styles.dangerSection, { backgroundColor: Colors[theme].stats }]}
    >
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Account Actions
      </Text>

      <TouchableOpacity
        style={[
          styles.dangerButton,
          {
            backgroundColor: Colors[theme].input,
            borderColor: Colors[theme].border,
          },
        ]}
        onPress={() => console.log('delete')}
      >
        <Ionicons name="trash" size={20} color={BaseColors.red} />
        <Text style={[styles.dangerButtonText, styles.deleteButtonText]}>
          Delete Account
        </Text>
        <Ionicons name="chevron-forward" size={20} color={Colors[theme].text} />
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
    padding: 20,
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
    gap: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  dangerButtonText: {
    flex: 1,
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
