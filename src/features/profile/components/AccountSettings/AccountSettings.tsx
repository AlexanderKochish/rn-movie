import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import NavigationItem from '@/src/shared/components/UI/NavigationItem/NavigationItem'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Switch } from 'react-native-paper'

const AccountSettings = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
    toggleTheme()
  }
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
        <View style={styles.switch}>
          <Icon
            source={theme === 'dark' ? 'weather-night' : 'white-balance-sunny'}
            size={24}
            color={Colors[theme].text}
          />
          <Text style={[styles.switchText, { color: Colors[theme].text }]}>
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </View>

        <Switch value={isSwitchOn} onChange={onToggleSwitch} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  switchText: {
    fontSize: Typography.title.fontSize,
  },
})
