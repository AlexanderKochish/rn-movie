import React from 'react'
import { FlatList } from 'react-native'
import { CrewMember } from '@/src/shared/types/types'
import CrewCard from '@/src/features/cast-and-crew/components/CrewCard/CrewCard'

type Props = {
  crew: CrewMember[] | undefined
  orientation?: boolean
  fullWidth?: boolean
}

const CrewList = ({ crew, orientation = true, fullWidth }: Props) => {
  return (
    <FlatList
      data={crew || []}
      keyExtractor={(item) => String(item.id + item.credit_id)}
      horizontal={orientation}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <CrewCard fullWidth={fullWidth} person={item} />
      )}
    />
  )
}

export default CrewList
