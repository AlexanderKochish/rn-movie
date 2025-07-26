import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  rating: number
  onRate: (value: number | ((prev: number) => number)) => void
}

const RatingStars = ({ rating, onRate }: Props) => {
  return (
    <Pressable style={styles.btn}>
      {[...Array(5)].map((_, i) => {
        const starNumber = i + 1
        return (
          <Pressable
            key={i}
            onPress={() =>
              onRate((prev) => (prev === starNumber ? 0 : starNumber))
            }
          >
            <Icon
              source={starNumber <= rating ? 'star' : 'star-outline'}
              size={24}
              color={starNumber <= rating ? 'yellow' : 'white'}
            />
          </Pressable>
        )
      })}
    </Pressable>
  )
}

export default RatingStars

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
  },
})
