import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  rating: number
  disabled?: boolean
  onRate: (value: number | ((prev: number) => number)) => void
}

const RatingStars = ({ rating, onRate, disabled }: Props) => {
  return (
    <View style={styles.btn}>
      {[...Array(5)].map((_, i) => {
        const starNumber = i + 1
        return (
          <Pressable
            key={i}
            disabled={disabled}
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
    </View>
  )
}

export default RatingStars

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
  },
})
