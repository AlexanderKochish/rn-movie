import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useRouter } from 'expo-router'

const BackTitleHeader = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <IconButton
        icon={'arrow-left'}
        iconColor={'#fff'}
        size={24}
        onPress={() => router.back()}
        style={{ marginRight: 10 }}
      />

      <Text style={styles.title}>Reviews</Text>
    </View>
  )
}

export default BackTitleHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})
