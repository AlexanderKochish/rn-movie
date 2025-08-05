import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import PreferenceSwitchItem from '@/src/shared/components/PreferenceSwitchItem/PreferenceSwitchItem'
import NavigationItem from '@/src/shared/components/UI/NavigationItem/NavigationItem'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

const AccountSettings = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
    toggleTheme()
  }

  const themeText = theme === 'dark' ? 'Dark Mode' : 'Light Mode'

  return (
    <View style={styles.settings}>
      <NavigationItem
        icon="account"
        onPress={() => null}
        settingName="Account"
        link={'/profile/account'}
      />
      <NavigationItem
        icon="email"
        onPress={() => null}
        settingName="Email settings"
        link={'/profile/email-settings'}
      />
      <NavigationItem
        icon="security"
        onPress={() => null}
        settingName="Security"
        link={'/profile/security'}
      />

      <View style={styles.switchWrapper}>
        <PreferenceSwitchItem
          icon={theme === 'dark' ? 'weather-night' : 'white-balance-sunny'}
          title={themeText}
          titleSize="titleLarge"
          value={isSwitchOn}
          onChangeValue={onToggleSwitch}
        />
      </View>
    </View>
  )
}

export default AccountSettings

const styles = StyleSheet.create({
  settings: {
    paddingVertical: 15,
  },

  switchWrapper: {
    paddingVertical: 10,
  },
})
