import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import NavigationItem from '@/src/shared/components/UI/NavigationItem/NavigationItem'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import { useRouter } from 'expo-router'
import React from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'

const QuickActions = () => {
  const router = useRouter()
  const { theme } = useTheme()
  const openTermsOfService = () => {
    router.push('/(tabs)/profile/terms-of-service')
  }

  const openDataRequest = () => {
    Linking.openURL('https://movieapp.com/data-request')
  }

  return (
    <View style={styles.actionsContainer}>
      <Text style={[styles.actionsTitle, { color: Colors[theme].text }]}>
        Quick Actions
      </Text>
      <NavigationItem
        leftIcon="download"
        onOpenLink={openDataRequest}
        text="Download Your Data"
        subText="Get a copy of your personal information"
      />

      <NavigationItem
        leftIcon="trash"
        onOpenLink={() => openSupportEmail('Permanently remove your data')}
        text="Delete Account"
        subText="Permanently remove your data"
        leftIconColor={BaseColors.red}
      />

      <NavigationItem
        leftIcon="document-text"
        onOpenLink={openTermsOfService}
        text="Terms of Service"
        subText="Read our terms and conditions"
      />
    </View>
  )
}

export default QuickActions

const styles = StyleSheet.create({
  actionsContainer: {
    marginBottom: 24,
    gap: 15,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})
