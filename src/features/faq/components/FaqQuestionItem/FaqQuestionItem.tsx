import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import { Ionicons } from '@expo/vector-icons'
import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FAQCategoryType, FAQQuestionType } from '../../types/types'

type Props = {
  item: FAQQuestionType
  expanded: boolean
  categories?: FAQCategoryType[] | undefined | null
  toggleQuestion: (id: string) => void
}

const FaqQuestionItem = ({
  item,
  expanded,
  categories,
  toggleQuestion,
}: Props) => {
  return (
    <View key={item.id} style={styles.faqItem}>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.questionContainer}
        onPress={() => toggleQuestion(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.questionContent}>
          <Text style={styles.questionText}>{item.question}</Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#666"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{item.answer}</Text>

          {categories?.find((category) => category.name === 'Technical') && (
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.supportLink}
              onPress={openSupportEmail}
            >
              <Text style={styles.supportLinkText}>Contact support now</Text>
              <Ionicons name="arrow-forward" size={16} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}

export default memo(FaqQuestionItem)

const styles = StyleSheet.create({
  faqItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  questionContainer: {
    padding: 16,
  },
  questionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  answerContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  answerText: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supportLinkText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
})
