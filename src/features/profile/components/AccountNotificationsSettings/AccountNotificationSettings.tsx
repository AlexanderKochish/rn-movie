import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import BaseCard from '@/src/shared/components/BaseCard/BaseCard'
import PreferenceSwitchItem from '@/src/shared/components/PreferenceSwitchItem/PreferenceSwitchItem'
import { BaseColors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { usePushNotifications } from '@/src/shared/hooks/usePushNotifications'
import Toast from 'react-native-toast-message'
import { useProfileNotificationPreferences } from '../../hooks/useProfileNotificationPreferences'

const AccountNotificationSettings = () => {
  const { theme: appTheme } = useTheme()
  const [isUnsubscribing, setIsUnsubscribing] = useState(false)

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
      return
    }
    updateMarketingEmails(value)
  }

  const handleNotificationsToggle = (value: boolean) => {
    if (value && hasPushError) {
      Toast.show({
        type: 'customRemoved',
        text1: 'First, allow push notifications in your device settings.',
      })
      return
    }
    updateNotifications(value)
  }

  const handleSubscribe = () => {
    setIsUnsubscribing(true)

    updateMarketingEmails(false)
    updateNotifications(false)

    Toast.show({
      type: 'customSuccess',
      text1: 'Unsubscribed successfully!',
      text2: 'You have been unsubscribed from all notifications.',
    })

    setTimeout(() => setIsUnsubscribing(false), 1000)
  }

  const handleResubscribe = () => {
    updateMarketingEmails(true)
    updateNotifications(true)

    Toast.show({
      type: 'customSuccess',
      text1: 'Subscribed successfully!',
      text2: 'You will receive all notifications.',
    })
  }

  const isFullyUnsubscribed =
    !preferences.marketing_emails && !preferences.notifications
  const isFullySubscribed =
    preferences.marketing_emails && preferences.notifications

  return (
    <View style={{ gap: 15 }}>
      {(isLoading || isUpdating || isSavingToken || isUnsubscribing) && (
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
            ⚠️ Email letters are not configured. Check permissions.
          </Text>
        )}

        {!hasPushError && preferences.marketing_emails && (
          <Text style={styles.successText}>✅ Email letters are active</Text>
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

      {isFullySubscribed ? (
        <Button
          style={styles.unsubscribeButton}
          buttonColor={BaseColors.red}
          labelStyle={styles.labelStyle}
          disabled={isUpdating || isUnsubscribing}
          onPress={handleSubscribe}
          mode="contained"
          icon="bell-off"
        >
          Unsubscribe from All
        </Button>
      ) : isFullyUnsubscribed ? (
        <Button
          style={styles.subscribeButton}
          buttonColor={BaseColors.green}
          labelStyle={styles.labelStyle}
          disabled={isUpdating}
          onPress={handleResubscribe}
          mode="contained"
          icon="bell"
        >
          Subscribe to All
        </Button>
      ) : (
        <View style={styles.buttonGroup}>
          <Button
            style={[styles.halfButton, styles.unsubscribeButton]}
            buttonColor={BaseColors.red}
            labelStyle={styles.labelStyle}
            disabled={isUpdating || isUnsubscribing}
            onPress={handleSubscribe}
            mode="contained"
            icon="bell-off"
          >
            Unsubscribe
          </Button>
          <Button
            style={[styles.halfButton, styles.subscribeButton]}
            buttonColor={BaseColors.green}
            labelStyle={styles.labelStyle}
            disabled={isUpdating}
            onPress={handleResubscribe}
            mode="contained"
            icon="bell"
          >
            Subscribe All
          </Button>
        </View>
      )}

      <Text style={styles.statusText}>
        {isFullySubscribed
          ? '✅ Subscribed to all notifications'
          : isFullyUnsubscribed
            ? '🔕 Unsubscribed from all notifications'
            : '⚡ Partially subscribed - some notifications active'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: Typography.title.fontSize,
    color: BaseColors.white,
    fontWeight: '600',
  },
  subscribeButton: {
    borderRadius: 10,
    marginVertical: 5,
  },
  unsubscribeButton: {
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  halfButton: {
    flex: 1,
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
  statusText: {
    textAlign: 'center',
    fontSize: Typography.body.fontSize,
    color: BaseColors.darkGray,
    marginTop: 10,
    fontStyle: 'italic',
  },
})

export default AccountNotificationSettings
