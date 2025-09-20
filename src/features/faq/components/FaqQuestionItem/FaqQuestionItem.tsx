import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
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
  const { theme } = useTheme()
  return (
    <View
      key={item.id}
      style={[styles.faqItem, { backgroundColor: Colors[theme].background }]}
    >
      <TouchableOpacity
        accessibilityRole="button"
        style={[
          styles.questionContainer,
          { borderColor: Colors[theme].border },
        ]}
        onPress={() => toggleQuestion(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.questionContent]}>
          <Text style={[styles.questionText, { color: Colors[theme].text }]}>
            {item.question}
          </Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#666"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View
          style={[
            styles.answerContainer,
            { borderColor: Colors[theme].border },
          ]}
        >
          <Text style={styles.answerText}>{item.answer}</Text>

          {categories?.find((category) => category.name === 'Technical') && (
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.supportLink}
              onPress={() => openSupportEmail()}
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
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  questionContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  questionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  answerContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
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
