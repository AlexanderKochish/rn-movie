import React from 'react'
import PersonCardBase from '@/src/features/cast-and-crew/components/PersonCardBase/PersonCardBase'
import { CrewMember } from '@/src/shared/types/types'

type Props = {
  person: CrewMember
  fullWidth?: boolean
}
const CrewCard = ({ person, fullWidth }: Props) => {
  return (
    <PersonCardBase
      fullWidth={fullWidth}
      id={person.id}
      name={person.name || person.original_name}
      role={person.job}
      profilePath={person.profile_path}
    />
  )
}

export default CrewCard
