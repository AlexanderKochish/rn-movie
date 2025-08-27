// AccountNotificationSettings.tsx
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import BaseCard from '@/src/shared/components/BaseCard/BaseCard'
import PreferenceSwitchItem from '@/src/shared/components/PreferenceSwitchItem/PreferenceSwitchItem'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { usePushNotifications } from '@/src/shared/hooks/usePushNotifications'
import Toast from 'react-native-toast-message'
import { useProfileNotificationPreferences } from '../../hooks/useProfileNotificationPreferences'

const AccountNotificationSettings = () => {
  const { theme: appTheme } = useTheme()

  const {
    preferences,
    isLoading,
    error: preferencesError,
    updateMarketingEmails,
    updateNotifications,
    isUpdating,
  } = useProfileNotificationPreferences()

  const {
    isSavingToken,
    saveError: pushError,
    hasPushError,
    clearError: clearPushError,
  } = usePushNotifications()

  useEffect(() => {
    if (pushError) {
      Toast.show({
        type: 'customError',
        text1: 'Error setting up push notifications',
      })

      const timer = setTimeout(() => {
        clearPushError()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [pushError, clearPushError])

  useEffect(() => {
    if (preferencesError) {
      Toast.show({ type: 'customError', text1: 'Error saving settings' })
    }
  }, [preferencesError])

  const handleMarketingEmailsToggle = (value: boolean) => {
    if (value && hasPushError) {
      Toast.show({
        type: 'customRemoved',
        text1: 'First, allow push notifications in your device settings.',
      })
    }
    updateMarketingEmails(value)
  }

  const handleNotificationsToggle = (value: boolean) => {
    if (value && hasPushError) {
      Toast.show({
        type: 'customRemoved',
        text1: 'First, allow push notifications in your device settings.',
      })
    }
    updateNotifications(value)
  }

  return (
    <View style={{ gap: 15 }}>
      {(isLoading || isUpdating || isSavingToken) && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Saving settings...</Text>
        </View>
      )}

      <BaseCard>
        <PreferenceSwitchItem
          icon="email"
          title="Marketing emails"
          titleSize="titleLarge"
          value={preferences.marketing_emails}
          onChangeValue={handleMarketingEmailsToggle}
          disabled={isUpdating}
        />
        <Text variant="titleMedium">
          Receive updates about the latest{'\n'}news and offers
        </Text>

        {hasPushError && (
          <Text style={styles.errorText}>
            ⚠️ Push notifications are not configured. Check permissions.
          </Text>
        )}

        {!hasPushError && preferences.notifications && (
          <Text style={styles.successText}>
            ✅ Push notifications are active
          </Text>
        )}
      </BaseCard>

      <BaseCard>
        <PreferenceSwitchItem
          icon="bell-ring"
          titleSize="titleLarge"
          title="Push Notifications"
          value={preferences.notifications}
          onChangeValue={handleNotificationsToggle}
          disabled={isUpdating || isSavingToken}
          error={hasPushError && preferences.notifications}
        />
        <Text variant="titleMedium">
          Receive push notifications for{'\n'}new movies and updates
        </Text>
      </BaseCard>

      <Button
        style={styles.subscribeButton}
        buttonColor={Colors[appTheme].btn}
        labelStyle={styles.labeStyle}
        disabled={isUpdating}
      >
        Unsubscribe
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  labeStyle: {
    fontSize: Typography.title.fontSize,
    color: BaseColors.white,
  },
  subscribeButton: {
    width: '100%',
    borderRadius: 10,
  },
  loadingContainer: {
    padding: 10,
    backgroundColor: BaseColors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadingText: {
    color: BaseColors.darkGray,
    fontSize: Typography.body.fontSize,
  },
  errorText: {
    color: BaseColors.red,
    fontSize: Typography.body.fontSize,
    marginTop: 8,
  },
  successText: {
    color: BaseColors.green,
    fontSize: Typography.body.fontSize,
    marginTop: 8,
  },
})

export default AccountNotificationSettings
