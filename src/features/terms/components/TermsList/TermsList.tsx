import { TermsOfServiceType } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TermsItem from '../TermsItem/TermsItem'
type Props = {
  terms: TermsOfServiceType[] | undefined
}
const TermsList = ({ terms }: Props) => {
  const [showFullContent, setShowFullContent] = useState(false)

  const abbreviatedContent = terms?.slice(0, 3)
  return (
    <View style={styles.termsContainer}>
      {(showFullContent ? terms : abbreviatedContent)?.map((term, index) => (
        <TermsItem key={term.id} term={term} index={index} />
      ))}

      {!showFullContent && (
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => setShowFullContent(true)}
        >
          <Text style={styles.showMoreText}>Show Full Terms</Text>
          <Ionicons name="chevron-down" size={16} color="#007AFF" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default TermsList

const styles = StyleSheet.create({
  termsContainer: {
    marginBottom: 24,
  },

  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  showMoreText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
})
