import MovieCard from '@/src/features/movie/components/MovieCard/MovieCard'
import { BaseColors } from '@/src/shared/styles/Colors'
import { MovieDetailsType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import { UseMutateFunction } from '@tanstack/react-query'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  movie: MovieDetailsType | undefined
  activeTab: 'rated' | 'favorites' | 'watchlist'
  toggleItem: UseMutateFunction<
    void,
    unknown,
    MovieDetailsType | undefined,
    unknown
  >
}
const BookmarkCard = ({ movie, toggleItem, activeTab }: Props) => {
  if (!movie) return
  return (
    <View style={styles.movieCard}>
      <MovieCard movie={movie} size="large" />
      <TouchableOpacity
        onPress={() => toggleItem(movie)}
        style={styles.removeButton}
      >
        <Ionicons
          name={activeTab === 'favorites' ? 'heart-dislike' : 'trash'}
          size={16}
          color={BaseColors.red}
        />
        <Text style={styles.removeText}>
          {activeTab === 'favorites' ? 'Remove' : 'Delete'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BookmarkCard

const styles = StyleSheet.create({
  movieCard: {
    justifyContent: 'space-between',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 6,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  removeText: {
    color: BaseColors.red,
    fontSize: 12,
    fontWeight: '600',
  },
})
