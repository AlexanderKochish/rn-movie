import Footer from '@/src/features/home/components/Footer/Footer'
import TermsLegalLinks from '@/src/features/terms/components/TermsLegalLinks/TermsLegalLinks'
import TermsList from '@/src/features/terms/components/TermsList/TermsList'
import { useTermsOfService } from '@/src/features/terms/hooks/useTermsOfService'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Header from '@/src/shared/components/Header/Header'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'

export default function TermsOfServiceScreen() {
  const router = useRouter()
  const { terms, isError, isLoading } = useTermsOfService()
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    if (accepted) {
      Toast.show({
        type: 'customSuccess',
        text1: 'Saved successfully',
      })
    }
  }, [accepted])

  if (isLoading) {
    return <Preloader />
  }

  if (isError) {
    return (
      <EmptyState
        colorIcon="#ff0000ff"
        style={{
          backgroundColor: 'rgba(109, 44, 44, 0.4)',
          borderColor: 'rgba(120, 43, 43, 0.58)',
          borderWidth: 1,
        }}
        icon="warning"
        title="Error"
        description="Try again later or send message to our support team!"
      />
    )
  }

  if (terms?.length === 0) {
    return (
      <EmptyState
        icon="document-text"
        title="Terms not found"
        description="Terms not found. Try latter againe"
      />
    )
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleAccept = () => {
    setAccepted(true)

    setTimeout(() => router.back(), 1500)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Header
        goBack
        title="Terms of Service"
        subTitle={`Last updated: ${currentDate}`}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={styles.introSection}>
          <Ionicons name="document-text" size={48} color="#007AFF" />
          <Text style={styles.introTitle}>Welcome to MovieApp</Text>
          <Text style={styles.introText}>
            Please read these Terms of Service carefully before using our
            application. By using MovieApp, you agree to be bound by these
            terms.
          </Text>
        </View>

        <TermsList terms={terms} />

        <TermsLegalLinks />
        {/* Acceptance Section */}
        <View style={styles.acceptanceSection}>
          <View style={styles.acceptanceHeader}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={accepted ? '#4CD964' : '#666'}
            />
            <Text style={styles.acceptanceTitle}>
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
              <Text style={styles.acceptedSubtext}>Redirecting back...</Text>
            </View>
          )}
        </View>

        <Footer title="All rights reserved" />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  introSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
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
    color: '#fff',
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
  acceptedSubtext: {
    color: '#888',
    fontSize: 14,
  },
})
