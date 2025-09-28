import { useTermsAcceptance } from '@/src/features/auth/hooks/useTermsAcceptance'
import { useTermsOfService } from '@/src/features/terms/hooks/useTermsOfService'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Header from '@/src/shared/components/Header/Header'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AcceptTermsScreen() {
  const { theme } = useTheme()
  const { handleAccept, isPending } = useTermsAcceptance()
  const { terms, isLoading, isError } = useTermsOfService()
  const [accepted, setAccepted] = useState(false)

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <Header title="Terms of Service" />

      {isLoading && <Preloader icon="document-text" text="Loading..." />}

      {isError && (
        <EmptyState
          icon="warning"
          title="Error"
          description="Try again later or send message to our support team!"
        />
      )}
      {terms && (
        <ScrollView
          style={styles.termsContainer}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text>Last updated: {new Date().toLocaleDateString()}</Text>
          {terms.map((term, i) => (
            <View key={term.id} style={styles.termContainer}>
              <Text style={[styles.termsContent]}>
                {`**${i + 1}.${' '}${term.title}`}
              </Text>
              <Text style={{ color: Colors[theme].textSecondary }}>
                {term.description}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

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
              <Ionicons name="checkmark" size={16} color={BaseColors.white} />
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
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  termsContainer: {
    flex: 1,
    padding: 24,
  },
  termsContent: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  termContainer: {
    gap: 10,
    paddingVertical: 5,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 40,
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
