import { useCredits } from '@/src/features/movie/hooks/useCredits'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { CrewMember } from '@/src/shared/types/types'
import React, { useCallback } from 'react'
import { FlatList, Text, View } from 'react-native'
import CastAndCrewCard from '../CastAndCrewCard/CastAndCrewCard'

const CastAndCrew = () => {
  const movieId = useMovieId()
  const { credits } = useCredits(movieId)
  const { theme } = useTheme()

  const renderCrewItem = useCallback(
    ({ item }: { item: CrewMember }) => <CastAndCrewCard person={item} />,
    []
  )
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Text style={[globalStyles.subTitle, { color: Colors[theme].text }]}>
        Cast & Crew
      </Text>
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
