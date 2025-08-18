import { useSignOut } from '@/src/features/auth/hooks/useSignOut'
import AccountSettings from '@/src/features/profile/components/AccountSettings/AccountSettings'
import InformationList from '@/src/features/profile/components/InformationList/InformationList'
import UserInfo from '@/src/features/profile/components/UserInfo/UserInfo'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const { theme } = useTheme()
  const { signOut } = useSignOut()

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserInfo />
        <AccountSettings />
        <InformationList />
        <CustomButton
          title="Log out"
          variant="secondary"
          icon="logout"
          onPress={() => signOut()}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
})
