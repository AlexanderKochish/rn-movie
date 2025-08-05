import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import BaseCard from '@/src/shared/components/BaseCard/BaseCard'
import PreferenceSwitchItem from '@/src/shared/components/PreferenceSwitchItem/PreferenceSwitchItem'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

const EmailSettingsScreen = () => {
  const { user } = useAuth()
  const { theme } = useTheme()

  return (
    <ScrollView style={[{ backgroundColor: Colors[theme].background }]}>
      <View style={styles.container}>
        <BaseCard>
          <Text variant="titleLarge">Email address</Text>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: BaseColors.gray,
            }}
          />
          <Text variant="titleMedium">{user?.email}</Text>
        </BaseCard>
        <BaseCard>
          <PreferenceSwitchItem
            icon="email"
            title="Marketing emails"
            titleSize="titleLarge"
          />
          <Text variant="titleMedium">
            Receive updates aboute the latest{'\n'}news and offers
          </Text>
        </BaseCard>
        <BaseCard>
          <PreferenceSwitchItem
            icon="bell-ring"
            titleSize="titleLarge"
            title="Notifications"
          />
          <Text variant="titleMedium">
            Receive email notifications for{'\n'}your account activity
          </Text>
        </BaseCard>
        <Button
          style={{ width: '100%', borderRadius: 10 }}
          buttonColor={Colors[theme].btn}
        >
          <Text variant="titleMedium">Unsubscribe</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

export default EmailSettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 20,
  },
})
