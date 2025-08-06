import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import PlayVideoButton from '@/src/shared/components/PlayVideoButton/PlayVideoButton'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useMovieId } from '../../hooks/useMovieId'

type Props = {
  overview: string | undefined
  producerName: string | undefined
}

const MovieDetailsDescription = ({ overview, producerName }: Props) => {
  const { theme } = useTheme()
  const movieId = useMovieId()
  return (
    <View style={styles.infoContainer}>
      <Text style={{ color: Colors[theme].text }}>2024 | Directed by</Text>
      <Text style={{ color: BaseColors.orangeLight }}>{producerName}</Text>
      <View style={styles.playButtonWrapper}>
        <PlayVideoButton movieId={movieId} />
      </View>
      <Text style={[styles.overview, { color: Colors[theme].text }]}>
        {overview}
      </Text>
    </View>
  )
}

export default MovieDetailsDescription

const styles = StyleSheet.create({
  infoContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    gap: 10,
  },
  overview: {
    fontSize: Typography.body.fontSize,
  },
  playButtonWrapper: {
    flex: 1,
    position: 'relative',
    paddingVertical: 20,
  },
})
