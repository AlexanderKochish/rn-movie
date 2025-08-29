import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  navigateToCategory: (category: string) => void
}

const QuickActions = ({ navigateToCategory }: Props) => {
  const router = useRouter()
  const navigateToSearch = () => {
    router.push('/search')
  }

  return (
    <View style={styles.quickActions}>
      <TouchableOpacity
        style={styles.quickAction}
        onPress={() => navigateToCategory('now_playing')}
      >
        <Ionicons name="film" size={24} color="#007AFF" />
        <Text style={styles.quickActionText}>In Theaters</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quickAction}
        onPress={() => navigateToCategory('popular')}
      >
        <Ionicons name="trending-up" size={24} color="#007AFF" />
        <Text style={styles.quickActionText}>Popular</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quickAction}
        onPress={() => navigateToCategory('upcoming')}
      >
        <Ionicons name="calendar" size={24} color="#007AFF" />
        <Text style={styles.quickActionText}>Coming Soon</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quickAction} onPress={navigateToSearch}>
        <Ionicons name="search" size={24} color="#007AFF" />
        <Text style={styles.quickActionText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

export default QuickActions

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
})
