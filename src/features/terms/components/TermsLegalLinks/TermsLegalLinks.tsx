import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TermsLegalLinks = () => {
  const router = useRouter()
  const openPrivacyPolicy = () => {
    router.push({
      pathname: '/profile/privacy-policy',
    })
  }
  return (
    <View style={styles.legalLinks}>
      <TouchableOpacity style={styles.legalLink} onPress={openPrivacyPolicy}>
        <Ionicons name="shield-checkmark" size={20} color="#007AFF" />
        <Text style={styles.legalLinkText}>Privacy Policy</Text>
        <Ionicons name="arrow-forward" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.legalLink}
        onPress={() => openSupportEmail('Terms of Service Inquiry')}
      >
        <Ionicons name="mail" size={20} color="#007AFF" />
        <Text style={styles.legalLinkText}>Contact Legal Team</Text>
        <Ionicons name="arrow-forward" size={16} color="#666" />
      </TouchableOpacity>
    </View>
  )
}

export default TermsLegalLinks

const styles = StyleSheet.create({
  legalLinks: {
    gap: 12,
    marginBottom: 24,
  },
  legalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  legalLinkText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
})
