import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  movieId: number
}

const PlayVideoButton = ({ movieId }: Props) => {
  const router = useRouter()
  return (
    <TouchableOpacity
      style={styles.trailerButton}
      onPress={() => {
        router.push({
          pathname: '/trailer',
          params: {
            id: movieId,
          },
        })
      }}
    >
      <Ionicons name="play" size={16} color="#fff" />
      <Text style={styles.trailerButtonText}>Watch Trailer</Text>
    </TouchableOpacity>
  )
}

export default PlayVideoButton

const styles = StyleSheet.create({
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    alignSelf: 'flex-start',
  },
  trailerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
})
