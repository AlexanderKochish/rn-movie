import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'

const UserInfo = () => {
  const { user } = useAuth()
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <Avatar.Image
        source={
          user?.photoURL
            ? { uri: user.photoURL }
            : require('../../../../../assets/images/profile-placeholder.png')
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
  )
}

export default UserInfo

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  name: {
    paddingVertical: 10,
    fontSize: Typography.title.fontSize,
  },
  email: {
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
  },
})
