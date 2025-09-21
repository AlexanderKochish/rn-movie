import { useTermsAcceptance } from '@/src/features/auth/hooks/useTermsAcceptance'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Header from '@/src/shared/components/Header/Header'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function AcceptTermsScreen() {
  const { theme } = useTheme()
  const { handleAccept, isPending } = useTermsAcceptance()
  const [accepted, setAccepted] = useState(false)

  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <Header title="Terms of Service" goBack />

      <ScrollView
        style={styles.termsContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.termsTitle, { color: Colors[theme].text }]}>
          Terms of Service
        </Text>

        <Text
          style={[styles.termsContent, { color: Colors[theme].textSecondary }]}
        >
          Last updated: {new Date().toLocaleDateString()}
          {'\n\n'}
          **1. Acceptance of Terms**
          {'\n'}
          By using Watcher, you agree to these Terms of Service and our Privacy
          Policy.
          {'\n\n'}
          **2. User Accounts**
          {'\n'}
          You are responsible for maintaining the confidentiality of your
          account and password.
          {'\n\n'}
          **3. Content Guidelines**
          {'\n'}
          You agree not to post content that is illegal, offensive, or violates
          others&apos; rights.
          {'\n\n'}
          **4. Intellectual Property**
          {'\n'}
          All content remains your property, but you grant us license to display
          it on our platform.
          {'\n\n'}
          **5. Termination**
          {'\n'}
          We may suspend or terminate your account for violations of these
          terms.
          {'\n\n'}
          **6. Limitation of Liability**
          {'\n'}
          Watcher is not liable for any indirect damages resulting from your use
          of the service.
          {'\n\n'}
          **7. Changes to Terms**
          {'\n'}
          We may update these terms periodically. Continued use constitutes
          acceptance.
          {'\n\n'}
          By clicking &quot;Accept & Continue&quot;, you acknowledge that you
          have read and understood these terms.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.checkboxContainer,
            { borderColor: Colors[theme].border },
          ]}
          onPress={() => setAccepted(!accepted)}
          disabled={isPending}
        >
          <View
            style={[
              styles.checkbox,
              accepted && styles.checkboxChecked,
              accepted && { backgroundColor: Colors[theme].text },
            ]}
          >
            {accepted && (
              <Ionicons name="checkmark" size={16} color={Colors[theme].text} />
            )}
          </View>
          <Text style={[styles.checkboxLabel, { color: Colors[theme].text }]}>
            I have read and agree to the Terms of Service
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.acceptButton,
            accepted
              ? { backgroundColor: Colors[theme].text }
              : styles.acceptButtonDisabled,
          ]}
          onPress={() => handleAccept()}
          disabled={!accepted || isPending}
        >
          <Text style={styles.acceptButtonText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  termsContainer: {
    flex: 1,
    padding: 24,
  },
  termsTitle: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  termsContent: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: 'transparent',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  acceptButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  acceptButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
})
