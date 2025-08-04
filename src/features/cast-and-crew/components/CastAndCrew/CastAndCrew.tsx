import React from 'react'
import { StyleSheet, View } from 'react-native'
import SubsectionHeader from '@/src/shared/components/SubsectionHeader/SubsectionHeader'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { useCredits } from '@/src/features/movie/hooks/useCredits'
import CrewList from '@/src/features/cast-and-crew/components/CrewList/CrewList'

const CastAndCrew = () => {
  const movieId = useMovieId()
  const { credits } = useCredits(movieId)

  return (
    <View style={styles.container}>
      <SubsectionHeader
        title={'Cast & Crew'}
        link={`/(movie)/${movieId}/credits`}
      />
      <CrewList crew={credits?.crew} />
    </View>
  )
}

export default CastAndCrew

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    gap: 10,
  },
})
