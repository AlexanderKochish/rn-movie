import React from 'react'
import PersonCardBase from '@/src/features/cast-and-crew/components/PersonCardBase/PersonCardBase'
import { CastMember } from '@/src/shared/types/types'

type Props = {
  person: CastMember
  fullWidth?: boolean
}

const CastCard = ({ person, fullWidth }: Props) => {
  return (
    <PersonCardBase
      fullWidth={fullWidth}
      id={person.id}
      name={person.name || person.original_name}
      role={person.character}
      profilePath={person.profile_path}
    />
  )
}

export default CastCard
