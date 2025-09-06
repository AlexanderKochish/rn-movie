import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { FAQCategoryType, FAQQuestionType } from '../../types/types'

type Props = {
  categories: FAQCategoryType[] | undefined | null
  selectedCategoryId: string
  faq: FAQQuestionType[] | undefined
  toggleQuestion: (id: string) => void
  expandedQuestionIds: string[]
}

const FaqListQuestions = ({
  categories,
  faq,
  selectedCategoryId,
  toggleQuestion,
  expandedQuestionIds,
}: Props) => {
  const openSupportEmail = () => {
    Linking.openURL('mailto:support@movieapp.com?subject=MovieApp Support')
  }
  return (
    <ScrollView
      style={styles.faqContainer}
      contentContainerStyle={styles.faqContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>
        {categories?.find(
          (f) => String(f.name).toLowerCase() === 'all questions'
        )
          ? 'All Questions'
          : categories?.find((c) => c.id === selectedCategoryId)?.name}{' '}
        ({faq?.length})
      </Text>

      {faq &&
        faq.map((item) => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleQuestion(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.questionContent}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Ionicons
                  name={
                    expandedQuestionIds?.includes(item.id)
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  size={20}
                  color="#666"
                />
              </View>
            </TouchableOpacity>

            {expandedQuestionIds?.includes(item.id) && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>

                {categories?.find(
                  (category) => category.name === 'Technical'
                ) && (
                  <TouchableOpacity
                    style={styles.supportLink}
                    onPress={openSupportEmail}
                  >
                    <Text style={styles.supportLinkText}>
                      Contact support now
                    </Text>
                    <Ionicons name="arrow-forward" size={16} color="#007AFF" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        ))}

      {/* Still need help section */}
      <View style={styles.helpSection}>
        <Ionicons name="help-buoy" size={48} color="#007AFF" />
        <Text style={styles.helpTitle}>Still need help?</Text>
        <Text style={styles.helpText}>
          Our support team is here to assist you with any questions or issues
          you might have.
        </Text>

        <TouchableOpacity style={styles.helpButton} onPress={openSupportEmail}>
          <Text style={styles.helpButtonText}>Get Help</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default FaqListQuestions

const styles = StyleSheet.create({
  faqContainer: {
    flex: 1,
  },
  faqContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
  helpSection: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  helpTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  helpText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
