import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  voteAverage?: number | null
}

const RatingResult = ({ voteAverage }: Props) => {
  const { theme } = useTheme()
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, i) => {
        const startRating = i + 1
        const rating = Math.ceil(Number(voteAverage) / 2)
        return (
          <Icon
            key={i}
            source={startRating <= rating ? 'star' : 'star-outline'}
            size={24}
            color={
              startRating <= rating ? BaseColors.yellow : Colors[theme].text
            }
          />
        )
      })}
    </View>
  )
}

export default RatingResult

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
})
