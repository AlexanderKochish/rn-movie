import ExpandButton from '@/src/shared/components/UI/ExpandButton/ExpandButton'
import { TermsOfServiceType } from '@/src/shared/types/types'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
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

      {!showFullContent && <ExpandButton onShowMore={setShowFullContent} />}
    </View>
  )
}

export default TermsList

const styles = StyleSheet.create({
  termsContainer: {
    marginBottom: 24,
  },
})
