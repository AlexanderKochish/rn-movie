import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper'

const RatingStars = () => {
  const [rating, setRating] = useState<number>(0)
  return (
    <Pressable style={{ flexDirection: 'row' }}>
      {[...Array(5)].map((_, i) => {
        const starNumber = i + 1
        return (
          <Pressable
            key={i}
            onPress={() =>
              setRating((prev) => (prev === starNumber ? 0 : starNumber))
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

const styles = StyleSheet.create({})
