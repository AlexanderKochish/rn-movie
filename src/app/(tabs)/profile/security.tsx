import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
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
      <View style={{ width: '100%', padding: 15, gap: 20 }}>
        <PreferenceSwitchItem
          icon="lock"
          titleSize="titleMedium"
          title="Change password"
          showSwitch={false}
        />
        <PreferenceSwitchItem
          icon="lock"
          titleSize="titleMedium"
          title="Two-factor authentication"
        />
        <PreferenceSwitchItem
          icon="eye"
          titleSize="titleMedium"
          title="Show sensitive content"
        />
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
})
