import { useSignOut } from '@/src/features/auth/hooks/useSignOut'
import ProfileMenuItem from '@/src/features/profile/components/ProfileMenuItem/ProfileMenuItem'
import UserInfo from '@/src/features/profile/components/UserInfo/UserInfo'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import MenuSection from '@/src/shared/components/MenuSection/MenuSection'
import SectionHeader from '@/src/shared/components/SectionHeader/SectionHeader'
import StatsGrid from '@/src/shared/components/StatsGrid/StatsGrid'
import { Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  const { signOut } = useSignOut()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const router = useRouter()
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
    toggleTheme()
  }

  const toggleNotifications = () =>
    setNotificationsEnabled((previousState) => !previousState)

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
      edges={['top']}
    >
      <UserInfo />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Profile" />
        <StatsGrid />
        <MenuSection>
          <ProfileMenuItem
            icon="person-outline"
            title="Profile"
            onPress={() => router.push('/(tabs)/profile/edit-profile')}
          />
          <ProfileMenuItem
            icon="mail-outline"
            title="Email settings"
            subtitle="Manage notifications"
            onPress={() => router.push('/(tabs)/profile/email-settings')}
          />
          <ProfileMenuItem
            icon="lock-closed-outline"
            title="Safety"
            subtitle="Password and 2FA"
            onPress={() => router.push('/(tabs)/profile/security')}
          />
          <ProfileMenuItem
            icon="notifications-outline"
            title="Notifications"
            hasSwitch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </MenuSection>

        <SectionHeader title="APPLICATION" />
        <MenuSection>
          <ProfileMenuItem
            icon="color-palette-outline"
            title="Appearance"
            hasSwitch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
          <ProfileMenuItem
            icon="megaphone-outline"
            title="What`s new"
            onPress={() => router.push('/(tabs)/profile/whats-new')}
          />
          <ProfileMenuItem
            icon="help-circle-outline"
            title="FAQ"
            onPress={() => router.push('/(tabs)/profile/faq')}
          />
          <ProfileMenuItem
            icon="star-outline"
            title="Rate the application"
            onPress={() => router.push('/(tabs)/profile/rate')}
          />
        </MenuSection>

        <SectionHeader title="LEGAL INFORMATION" />
        <MenuSection>
          <ProfileMenuItem
            icon="document-text-outline"
            title="Terms of Use"
            onPress={() => router.push('/(tabs)/profile/terms-of-service')}
          />
          <ProfileMenuItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            isLast
            onPress={() => router.push('/(tabs)/profile/privacy-policy')}
          />
        </MenuSection>

        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color="#ff6b6b" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0a0a0a',
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderRadius: 16,
    padding: 20,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#64b5f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#b0b0b0',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 10,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 18,
    borderRadius: 16,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  logoutText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
})

export default ProfileScreen
