import BaseCard from '@/src/shared/components/BaseCard/BaseCard'
import { TermsOfServiceType } from '@/src/shared/types/types'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

type Props = {
  term: TermsOfServiceType
  index: number
}

const TermsItem = ({ term, index }: Props) => {
  return (
    <BaseCard>
      <Text style={styles.sectionTitle}>
        {`${index + 1}. `}
        {term.title}
      </Text>
      <Text style={styles.sectionContent}>{term.description}</Text>
    </BaseCard>
  )
}

export default TermsItem

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
})
