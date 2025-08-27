import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { BaseColors } from '../../styles/Colors'

type Props = {
  movieId: number
}

const PlayVideoButton = ({ movieId }: Props) => {
  const router = useRouter()
  return (
    <Button
      style={styles.playBtn}
      icon="play-outline"
      mode="contained"
      labelStyle={styles.label}
      onPress={() => {
        router.push({
          pathname: '/trailer',
          params: {
            id: movieId,
          },
        })
      }}
    >
      Trailer
    </Button>
  )
}

export default PlayVideoButton

const styles = StyleSheet.create({
  playBtn: {
    backgroundColor: BaseColors.brown,
    position: 'absolute',
    bottom: -5,
    zIndex: 100,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    color: BaseColors.orangeLight,
  },
})
