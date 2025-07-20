import { useAuth } from '@/src/features/auth/context/AuthContext'
import SettingItem from '@/src/features/profile/components/SettingItem/SettingItem'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import { auth } from '@/src/shared/services/firebase'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { signOut } from 'firebase/auth'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Icon, Switch, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const { user } = useAuth()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark.background,
        paddingHorizontal: 15,
      }}
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
        <Text
          style={{
            paddingVertical: 10,
            color: Colors.dark.text,
            fontSize: Typography.title.fontSize,
          }}
        >
          {user?.displayName ?? 'No name'}
        </Text>
        <Text
          style={{
            paddingVertical: 10,
            color: Colors.dark.text,
            fontSize: Typography.title.fontSize,
          }}
        >
          {user?.email}
        </Text>
      </View>
      <View style={{ gap: 20, paddingVertical: 20 }}>
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Icon source={'weather-night'} size={24} color={Colors.dark.text} />
            <Text
              style={{
                color: Colors.dark.text,
                fontSize: Typography.title.fontSize,
              }}
            >
              Dark Mode
            </Text>
          </View>

          <Switch />
        </View>
      </View>
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
          gap: 20,
          borderTopColor: BaseColors.brown,
          borderTopWidth: 1,
        }}
      >
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

const styles = StyleSheet.create({})
// white-balance-sunny
