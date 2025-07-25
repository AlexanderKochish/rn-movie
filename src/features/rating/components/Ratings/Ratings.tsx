import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import RatingModal from '../RatingModal/RatingModal'
import RetingResult from '../RatingResult/RatingResult'
import RatingStars from '../RatingStars/RatingStars'

type Props = {
  voteAverage: number | undefined
  voteCount: number | undefined
}

const Ratings = ({ voteAverage, voteCount }: Props) => {
  const [visible, setVisible] = useState(false)

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
        content={<RatingStars />}
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
