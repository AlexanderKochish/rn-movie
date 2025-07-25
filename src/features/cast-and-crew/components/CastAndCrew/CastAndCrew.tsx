import { useCredits } from '@/src/features/movie/hooks/useCredits'
import { Colors } from '@/src/shared/styles/Colors'
import { CrewMember } from '@/src/shared/types/types'
import React, { useCallback } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import CastAndCrewCard from '../CastAndCrewCard/CastAndCrewCard'

type Props = {
  movieId: number
}

const CastAndCrew = ({ movieId }: Props) => {
  const { credits } = useCredits(movieId)

  const renderCrewItem = useCallback(
    ({ item }: { item: CrewMember }) => <CastAndCrewCard person={item} />,
    []
  )
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Text style={styles.headerTitle}>Cast & Crew</Text>
      <FlatList
        data={credits?.crew || []}
        keyExtractor={(item) => String(item.id + item.credit_id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCrewItem}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  )
}

export default CastAndCrew

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    color: Colors.dark.text,
  },
})
