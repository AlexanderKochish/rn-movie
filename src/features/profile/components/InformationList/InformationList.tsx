import NavigationItem from '@/src/shared/components/UI/NavigationItem/NavigationItem'
import { BaseColors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const InformationList = () => {
  return (
    <View style={styles.settingsBottom}>
      <NavigationItem
        onPress={() => null}
        settingName="Whats new"
        link={'/profile/account'}
      />
      <NavigationItem
        onPress={() => null}
        settingName="FAQ"
        link={'/profile/account'}
      />
      <NavigationItem
        onPress={() => null}
        settingName="Terms of Service"
        link={'/profile/account'}
      />
      <NavigationItem
        onPress={() => null}
        settingName="Privacy Policy"
        link={'/profile/account'}
      />
    </View>
  )
}

export default InformationList

const styles = StyleSheet.create({
  settingsBottom: {
    paddingVertical: 15,
    flex: 1,
    borderTopColor: BaseColors.brown,
    borderTopWidth: 1,
  },
})
