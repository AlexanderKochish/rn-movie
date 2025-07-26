import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { adaptOnChange } from '@/src/shared/utils/adaptOnChange'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useRating } from '../../hooks/useRating'
import RatingModal from '../RatingModal/RatingModal'
import RetingResult from '../RatingResult/RatingResult'
import RatingStars from '../RatingStars/RatingStars'

type Props = {
  movieId: number
  voteAverage?: number
  voteCount?: number
}

const Ratings = ({ voteAverage, voteCount, movieId }: Props) => {
  const [visible, setVisible] = useState(false)
  const { control, handleSubmit, isPending } = useRating(movieId)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  return (
    <>
      <View style={styles.rating}>
        <Text style={styles.headerTitle}>Ratings</Text>
        <View style={{ gap: 15 }}>
          <Pressable onPress={showDialog} style={{ flexDirection: 'row' }}>
            <RetingResult voteAverage={voteAverage} />
          </Pressable>
          <View>
            <Text style={styles.text}>
              {voteAverage} IMDB | {voteCount} RATE
            </Text>
          </View>
        </View>
      </View>

      <RatingModal
        hideDialog={hideDialog}
        visible={visible}
        title="Rate this movie!"
        content={
          <>
            <Controller
              control={control}
              name="rating"
              render={({ field: { onChange, value } }) => (
                <RatingStars
                  rating={value}
                  onRate={adaptOnChange(value, onChange)}
                />
              )}
            />
            <Button mode="text" onPress={handleSubmit}>
              Send
            </Button>
          </>
        }
      />
    </>
  )
}

export default Ratings

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: BaseColors.brown,
    borderTopColor: BaseColors.brown,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.dark.text,
  },
  text: {
    color: Colors.dark.text,
  },
})
