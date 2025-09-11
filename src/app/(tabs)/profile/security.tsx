import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import BaseCard from '@/src/shared/components/BaseCard/BaseCard'
import Header from '@/src/shared/components/Header/Header'
import PreferenceSwitchItem from '@/src/shared/components/PreferenceSwitchItem/PreferenceSwitchItem'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const SecurityScreen = () => {
  const { theme } = useTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <Header title="Security" goBack />
      <View style={styles.wrapper}>
        <BaseCard>
          <PreferenceSwitchItem
            icon="lock-closed"
            titleSize="titleMedium"
            title="Change password"
            showSwitch={false}
          />
        </BaseCard>
        <BaseCard>
          <PreferenceSwitchItem
            icon="lock-closed"
            titleSize="titleMedium"
            title="Two-factor authentication"
          />
        </BaseCard>
        <BaseCard>
          <PreferenceSwitchItem
            icon="eye"
            titleSize="titleMedium"
            title="Show sensitive content"
          />
        </BaseCard>
      </View>
    </View>
  )
}

export default SecurityScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    padding: 15,
    gap: 20,
  },
})
