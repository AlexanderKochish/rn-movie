import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const BookmarksScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.dark.background,
        paddingHorizontal: 15,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            flex: 1,
          }}
        >
          <Icon source={'star-outline'} size={24} color={Colors.dark.text} />
          <Text
            style={{
              color: Colors.dark.text,
              fontSize: Typography.title.fontSize,
            }}
          >
            Stars
          </Text>
        </View>
        <Text style={{ color: Colors.dark.text }}>List is empty</Text>
      </View>
    </SafeAreaView>
  )
}

export default BookmarksScreen

const styles = StyleSheet.create({})
