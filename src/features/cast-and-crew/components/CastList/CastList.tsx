import CastCard from '@/src/features/cast-and-crew/components/CastCard/CastCard'
import { CastMember } from '@/src/shared/types/types'
import React from 'react'
import { FlatList } from 'react-native'

type Props = {
  cast: CastMember[] | undefined
  orientation?: boolean
  fullWidth?: boolean
}

const CastList = ({ cast, orientation = true, fullWidth }: Props) => {
  return (
    <FlatList
      data={cast || []}
      keyExtractor={(item) => String(item.id + item.credit_id)}
      horizontal={orientation}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: { item: CastMember }) => (
        <CastCard fullWidth={fullWidth} person={item} />
      )}
    />
  )
}

export default CastList
