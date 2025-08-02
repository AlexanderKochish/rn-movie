import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { adaptOnChange } from '@/src/shared/utils/adaptOnChange'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useRating } from '../../hooks/useRating'
import RatingModal from '../RatingModal/RatingModal'
import RetingResult from '../RatingResult/RatingResult'
import RatingStars from '../RatingStars/RatingStars'

type Props = {
  voteAverage?: number
  voteCount?: number
}

const Ratings = ({ voteAverage, voteCount }: Props) => {
  const [visible, setVisible] = useState(false)
  const movieId = useMovieId()
  const { control, handleSubmit, isPending, isSuccess } = useRating(movieId)
  const { theme } = useTheme()

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  useEffect(() => {
    if (isSuccess) {
      hideDialog()
    }
  }, [isSuccess])

  return (
    <>
      <View style={styles.rating}>
        <Text style={[globalStyles.subTitle, { color: Colors[theme].text }]}>
          Ratings
        </Text>
        <View style={{ gap: 15 }}>
          <Pressable onPress={showDialog} style={{ flexDirection: 'row' }}>
            <RetingResult voteAverage={voteAverage} />
          </Pressable>
          <View>
            <Text style={{ color: Colors[theme].text }}>
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
    paddingVertical: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    gap: 10,
  },
})
