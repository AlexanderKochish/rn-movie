import Footer from '@/src/features/home/components/Footer/Footer'
import { useProfile } from '@/src/features/profile/hooks/useProfile'
import TermsLegalLinks from '@/src/features/terms/components/TermsLegalLinks/TermsLegalLinks'
import TermsList from '@/src/features/terms/components/TermsList/TermsList'
import { useTermsOfService } from '@/src/features/terms/hooks/useTermsOfService'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Header from '@/src/shared/components/Header/Header'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { currentDate } from '@/src/shared/utils/currentDate'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function TermsOfServiceScreen() {
  const router = useRouter()
  const { theme } = useTheme()
  const { terms, isError, isLoading } = useTermsOfService()
  const { profile } = useProfile()
  const [accepted, setAccepted] = useState(profile?.terms_accepted)

  if (isLoading) {
    return <Preloader icon="document-text" text="Loading..." />
  }

  if (isError) {
    return (
      <EmptyState
        colorIcon={BaseColors.red}
        style={globalStyles.introSectionError}
        icon="warning"
        title="Error"
        description="Try again later or send message to our support team!"
      />
    )
  }

  if (!isLoading && terms?.length === 0) {
    return (
      <EmptyState
        icon="document-text"
        title="Terms not found"
        description="Terms not found. Try latter againe"
      />
    )
  }

  const handleAccept = () => {
    setAccepted(true)
    setTimeout(() => router.back(), 1500)
  }

  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <Header
        goBack
        title="Terms of Service"
        subTitle={`Last updated: ${currentDate}`}
      />

      <ScrollView
        style={globalStyles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <EmptyState
          style={globalStyles.introSection}
          colorIcon={BaseColors.blueDark}
          icon="document-text"
          title="Welcome to Watcher"
          description="Please read these Terms of Service carefully before using our
            application. By using MovieApp, you agree to be bound by these
            terms."
        />

        <TermsList terms={terms} />

        <TermsLegalLinks />
        <View style={styles.acceptanceSection}>
          <View style={styles.acceptanceHeader}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={accepted ? BaseColors.green : BaseColors.gray}
            />
            <Text
              style={[styles.acceptanceTitle, { color: Colors[theme].text }]}
            >
              {accepted ? 'Terms Accepted' : 'Accept Terms of Service'}
            </Text>
          </View>

          <Text style={styles.acceptanceText}>
            By accepting, you acknowledge that you have read, understood, and
            agree to be bound by these Terms of Service.
          </Text>

          {!accepted ? (
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
            >
              <Text style={styles.acceptButtonText}>I Accept</Text>
              <Ionicons name="checkmark" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.acceptedContainer}>
              <Text style={styles.acceptedText}>Thank you for accepting!</Text>
            </View>
          )}
        </View>

        <Footer title="All rights reserved" />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  introTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  introText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  acceptanceSection: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  acceptanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  acceptanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  acceptanceText: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptedContainer: {
    alignItems: 'center',
    padding: 16,
  },
  acceptedText: {
    color: '#4CD964',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
})
