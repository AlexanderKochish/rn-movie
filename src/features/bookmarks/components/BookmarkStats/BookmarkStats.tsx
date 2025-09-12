import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { MovieDetailsType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  collection: MovieDetailsType[] | null
}

const BookmarkStats = ({ collection }: Props) => {
  const { theme } = useTheme()

  if (!collection) return
  return (
    <View
      style={[
        styles.statsContainer,
        {
          backgroundColor: Colors[theme].stats,
          borderColor: Colors[theme].border,
        },
      ]}
    >
      <View style={styles.statItem}>
        <Ionicons name="film" size={20} color={BaseColors.blueDark} />
        <Text style={[styles.statNumber, { color: Colors[theme].text }]}>
          {collection?.length}
        </Text>
        <Text style={styles.statLabel}>Total movies</Text>
      </View>

      <View style={styles.statItem}>
        <Ionicons name="star" size={20} color={BaseColors.yellow} />
        <Text style={styles.statNumber}>
          {/* {(
                       collection.reduce(
                         (sum, movie) => sum + (movie.rating || 0),
                         0
                       ) / currentList.length
                     ).toFixed(1)} */}
        </Text>
        <Text style={styles.statLabel}>Avg rating</Text>
      </View>

      <View style={styles.statItem}>
        <Ionicons name="time" size={20} color="#34C759" />
        <Text style={styles.statNumber}>
          {Math.floor(collection.length * 2.5)}h
        </Text>
        <Text style={styles.statLabel}>Watch time</Text>
      </View>
    </View>
  )
}

export default BookmarkStats

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
})
