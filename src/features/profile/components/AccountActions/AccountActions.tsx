import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import NavigationItem from '@/src/shared/components/UI/NavigationItem/NavigationItem'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AccountActions = () => {
  const { theme } = useTheme()
  return (
    <View
      style={[styles.dangerSection, { backgroundColor: Colors[theme].stats }]}
    >
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Account Actions
      </Text>

      <NavigationItem
        leftIcon="trash"
        onOpenLink={() => openSupportEmail('Permanently remove your data')}
        text="Delete Account"
        leftIconColor={BaseColors.red}
        rightIcon="chevron-forward"
      />
    </View>
  )
}

export default AccountActions

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dangerSection: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 12,
  },
})
