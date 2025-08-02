import { useParam } from '@/src/shared/hooks/useParam'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PersonDetailsScreen = () => {
  const personId = useParam('personId')
  return (
    <View>
      <Text>PersonScreen</Text>
    </View>
  )
}

export default PersonDetailsScreen

const styles = StyleSheet.create({})
