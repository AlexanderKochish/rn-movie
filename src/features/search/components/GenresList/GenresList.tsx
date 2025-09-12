import { useGenres } from '@/src/features/movie/hooks/useGenres'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Chip, Text } from 'react-native-paper'

type Props = {
  handleGenre: (id: number) => void
  genreIds: number[]
}

const GenresList = ({ genreIds, handleGenre }: Props) => {
  const { theme } = useTheme()
  const { genres } = useGenres()

  return (
    <View
      style={[
        styles.genresSection,
        { backgroundColor: Colors[theme].tabBackground },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        Select Genres
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genresContainer}
      >
        {genres?.map((genre) => (
          <Chip
            key={genre.id}
            mode="flat"
            textStyle={{ color: Colors[theme].text }}
            style={[
              styles.genreChip,
              { backgroundColor: Colors[theme].chip },
              genreIds.includes(genre.id) && styles.genreChipActive,
            ]}
            onPress={() => handleGenre(genre.id)}
          >
            {genre.name}
          </Chip>
        ))}
      </ScrollView>
    </View>
  )
}

export default GenresList

const styles = StyleSheet.create({
  containerGenres: {
    columnGap: 10,
  },

  genresSection: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  genresContainer: {
    gap: 8,
  },
  genreChip: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  genreChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  genreText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  genreTextActive: {
    color: '#fff',
  },
})
