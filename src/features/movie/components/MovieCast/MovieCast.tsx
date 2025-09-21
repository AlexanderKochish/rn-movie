import CastList from '@/src/features/cast-and-crew/components/CastList/CastList'
import { useCredits } from '@/src/features/cast-and-crew/hooks/useCredits'
import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useMovieId } from '../../hooks/useMovieId'

const MovieCast = () => {
  const id = useMovieId()
  const { credits } = useCredits(id)
  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.tabContent}>
      <CastList cast={credits?.cast} />
    </Animated.View>
  )
}

export default MovieCast

const styles = StyleSheet.create({
  tabContent: {
    marginBottom: 20,
  },
})
