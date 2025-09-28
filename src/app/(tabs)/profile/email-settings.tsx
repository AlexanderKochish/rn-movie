import AccountNotificationSettings from '@/src/features/profile/components/AccountNotificationsSettings/AccountNotificationSettings'
import { useProfile } from '@/src/features/profile/hooks/useProfile'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import BaseCard from '@/src/shared/components/BaseCard/BaseCard'
import Header from '@/src/shared/components/Header/Header'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const EmailSettingsScreen = () => {
  const { profile } = useProfile()
  const { theme } = useTheme()

  return (
    <>
      <Header
        title="Email Settings"
        subTitle="Here you can subscribe to our news"
        goBack
      />
      <ScrollView style={[{ backgroundColor: Colors[theme].background }]}>
        <View style={styles.container}>
          <BaseCard>
            <Text variant="titleLarge">Email address</Text>
            <View style={styles.borderLine} />
            <Text variant="titleMedium" style={{ color: BaseColors.gray }}>
              {profile?.email}
            </Text>
          </BaseCard>
          <AccountNotificationSettings />
        </View>
      </ScrollView>
    </>
  )
}

export default EmailSettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 20,
  },
  borderLine: {
    width: '100%',
    height: 1,
    marginVertical: 8,
    backgroundColor: BaseColors.gray,
  },
})
