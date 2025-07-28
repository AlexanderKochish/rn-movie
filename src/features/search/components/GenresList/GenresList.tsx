import { useGenres } from '@/src/features/movie/hooks/useGenres'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

type Props = {
  handleGenre: (id: number) => void
  genreIds: number[]
}

const GenresList = ({ genreIds, handleGenre }: Props) => {
  const { theme } = useTheme()
  const { genres } = useGenres()

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGenres}
        horizontal
        data={genres?.genres}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Button
            onPress={() => handleGenre(item.id)}
            buttonColor={
              genreIds?.includes(item.id)
                ? BaseColors.orange
                : Colors[theme].chip
            }
            mode="contained"
            textColor={Colors[theme].text}
          >
            {item.name}
          </Button>
        )}
      />
    </View>
  )
}

export default GenresList

const styles = StyleSheet.create({
  containerGenres: {
    columnGap: 10,
  },
})
