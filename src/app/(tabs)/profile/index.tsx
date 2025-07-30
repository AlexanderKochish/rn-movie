import AccountSettings from '@/src/features/profile/components/AccountSettings/AccountSettings'
import InformationList from '@/src/features/profile/components/InformationList/InformationList'
import UserInfo from '@/src/features/profile/components/UserInfo/UserInfo'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import { auth } from '@/src/shared/services/firebase'
import { Colors } from '@/src/shared/styles/Colors'
import { signOut } from 'firebase/auth'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const ProfileScreen = () => {
  const { theme } = useTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <UserInfo />
      <AccountSettings />
      <InformationList />
      <CustomButton
        title="Log out"
        variant="secondary"
        icon="logout"
        onPress={async () => await signOut(auth)}
      />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
})
