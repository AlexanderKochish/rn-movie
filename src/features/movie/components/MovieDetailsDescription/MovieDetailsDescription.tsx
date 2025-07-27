import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type Props = {
  overview: string | undefined
  producerName: string | undefined
}

const MovieDetailsDescription = ({ overview, producerName }: Props) => {
  const { theme } = useTheme()
  return (
    <View style={styles.infoContainer}>
      <Text style={{ color: Colors[theme].text }}>2024 | Directed by</Text>
      <Text style={{ color: BaseColors.orangeLight }}>{producerName}</Text>
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
})
