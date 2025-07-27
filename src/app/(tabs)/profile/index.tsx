import { useAuth } from '@/src/features/auth/hooks/useAuth'
import SettingItem from '@/src/features/profile/components/SettingItem/SettingItem'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import { auth } from '@/src/shared/services/firebase'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Icon, Switch, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
    toggleTheme()
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Avatar.Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require('../../../../assets/images/profile-placeholder.png')
          }
          size={115}
        />
        <Text style={[styles.name, { color: Colors[theme].text }]}>
          {user?.displayName ?? 'No name'}
        </Text>
        <Text style={[styles.email, { color: Colors[theme].text }]}>
          {user?.email}
        </Text>
      </View>
      <View style={styles.settings}>
        <SettingItem
          icon="account"
          onPress={() => null}
          settingName="Account"
        />
        <SettingItem
          icon="email"
          onPress={() => null}
          settingName="Email settings"
        />
        <SettingItem
          icon="security"
          onPress={() => null}
          settingName="Security"
        />

        <View style={styles.switchWrapper}>
          <View style={styles.switch}>
            <Icon
              source={
                theme === 'dark' ? 'weather-night' : 'white-balance-sunny'
              }
              size={24}
              color={Colors[theme].text}
            />
            <Text style={[styles.switchText, { color: Colors[theme].text }]}>
              {theme === 'dark' ? 'Dark' : 'Light'} Mode
            </Text>
          </View>

          <Switch value={isSwitchOn} onChange={onToggleSwitch} />
        </View>
      </View>
      <View style={styles.settingsBottom}>
        <SettingItem onPress={() => null} settingName="Whats new" />
        <SettingItem onPress={() => null} settingName="FAQ" />
        <SettingItem onPress={() => null} settingName="Terms of Service" />
        <SettingItem onPress={() => null} settingName="Privacy Policy" />
      </View>
      <CustomButton
        title="Log out"
        variant="secondary"
        icon="logout"
        onPress={async () => await signOut(auth)}
      />
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  name: {
    paddingVertical: 10,
    fontSize: Typography.title.fontSize,
  },
  email: {
    paddingVertical: 10,
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
  },
  settings: {
    gap: 20,
    paddingVertical: 20,
  },
  settingsBottom: {
    paddingVertical: 20,
    flex: 1,
    gap: 20,
    borderTopColor: BaseColors.brown,
    borderTopWidth: 1,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
