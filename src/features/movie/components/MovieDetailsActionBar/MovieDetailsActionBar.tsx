import { useBookmark } from '@/src/features/bookmarks/hooks/useBookmark'
import RatingModal from '@/src/features/rating/components/RatingModal/RatingModal'
import RatingStars from '@/src/features/rating/components/RatingStars/RatingStars'
import { useRating } from '@/src/features/rating/hooks/useRating'
import { adaptOnChange } from '@/src/shared/utils/adaptOnChange'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'
import { useMovieDetails } from '../../hooks/useMovieDetails'
import { useMovieId } from '../../hooks/useMovieId'

const MovieDetailsActionBar = () => {
  const [visible, setVisible] = useState(false)
  const movieId = useMovieId()
  const { control, handleSubmit, isPending, isSuccess } = useRating(movieId)
  const { data: movie } = useMovieDetails(movieId)
  const {
    isItemToggled: isBookmarkToggled,
    toggleItem: toggleBookmark,
    isLoading,
  } = useBookmark()
  const isActiveBookmark = isBookmarkToggled(movieId)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  useEffect(() => {
    if (isSuccess) {
      hideDialog()
    }
  }, [isSuccess])

  return (
    <>
      <RatingModal
        hideDialog={hideDialog}
        visible={visible}
        title="Rate this movie!"
        content={
          <>
            <Controller
              control={control}
              name="rating"
              disabled={isPending}
              render={({ field: { onChange, value, disabled } }) => (
                <RatingStars
                  disabled={disabled}
                  rating={value}
                  onRate={adaptOnChange(value, onChange)}
                />
              )}
            />
            <Button disabled={isPending} mode="text" onPress={handleSubmit}>
              Send
            </Button>
          </>
        }
      />
      <View style={styles.actionBar}>
        <TouchableOpacity
          onPress={() => toggleBookmark(movie)}
          style={[
            styles.watchlistButton,
            isActiveBookmark && styles.watchlistButtonActive,
            isLoading && styles.watchlistButtonLoading,
          ]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <>
              <Ionicons
                name={isActiveBookmark ? 'checkmark-circle' : 'add'}
                size={22}
                color={isActiveBookmark ? '#34C759' : '#007AFF'}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.watchlistText,
                  isActiveBookmark && styles.watchlistTextActive,
                ]}
              >
                {isActiveBookmark ? 'In Watchlist' : 'Add to Watchlist'}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={showDialog} style={styles.rateButton}>
          {isPending && <ActivityIndicator size={'small'} />}
          <Ionicons name="star" size={20} color="#FFCC00" />
          <Text style={styles.rateText}>Rate Movie</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default MovieDetailsActionBar

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    gap: 12,
  },
  watchlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
    gap: 8,
  },
  watchlistButtonActive: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderColor: 'rgba(52, 199, 89, 0.35)',
  },
  watchlistButtonLoading: {
    opacity: 0.7,
  },
  watchlistText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  watchlistTextActive: {
    color: '#34c759ff',
  },
  icon: {
    marginRight: 4,
  },
  rateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 204, 0, 0.1)',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 204, 0, 0.2)',
  },
  rateText: {
    color: '#FFCC00',
    fontSize: 16,
    fontWeight: '600',
  },
})
