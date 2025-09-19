import NavigationItem from '@/src/shared/components/UI/NavigationItem/NavigationItem'
import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const TermsLegalLinks = () => {
  const router = useRouter()
  const openPrivacyPolicy = () => {
    router.push({
      pathname: '/profile/privacy-policy',
    })
  }
  return (
    <View style={styles.legalLinks}>
      <NavigationItem
        leftIcon="shield-checkmark"
        text="Privacy Policy"
        onOpenLink={openPrivacyPolicy}
      />

      <NavigationItem
        leftIcon="mail"
        text="Contact Legal Team"
        onOpenLink={() => openSupportEmail('Terms of Service Inquiry')}
      />
    </View>
  )
}

export default TermsLegalLinks

const styles = StyleSheet.create({
  legalLinks: {
    gap: 12,
    marginBottom: 24,
  },
})
