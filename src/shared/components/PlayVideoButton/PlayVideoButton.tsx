import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  movieId: number
  size?: 'small' | 'regular'
}

const PlayVideoButton = ({ movieId, size = 'regular' }: Props) => {
  const buttonSizes = {
    regular: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 25,
    },
    small: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
  }

  const buttonFontSize = {
    regular: {
      fontSize: 16,
      fontWeight: '600' as const,
    },
    small: {
      fontSize: 14,
      fontWeight: '600' as const,
    },
  }

  const router = useRouter()
  return (
    <TouchableOpacity
      style={[styles.trailerButton, buttonSizes[size]]}
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
      <Text style={[styles.trailerButtonText, buttonFontSize[size]]}>
        Watch Trailer
      </Text>
    </TouchableOpacity>
  )
}

export default PlayVideoButton

const styles = StyleSheet.create({
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    gap: 8,
    alignSelf: 'flex-start',
  },
  trailerButtonText: {
    color: '#fff',
  },
})
