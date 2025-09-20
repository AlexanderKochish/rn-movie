import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { Colors } from '@/src/shared/styles/Colors'
import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import { Ionicons } from '@expo/vector-icons'
import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { FAQCategoryType, FAQQuestionType } from '../../types/types'
import FaqQuestionItem from '../FaqQuestionItem/FaqQuestionItem'

type Props = {
  categories: FAQCategoryType[] | undefined | null
  selectedCategoryId: string
  faq: FAQQuestionType[] | undefined
  toggleQuestion: (id: string) => void
  expandedQuestionIds: string[]
  isLoading: boolean
  isError: boolean
}

const FaqListQuestions = ({
  categories,
  faq,
  selectedCategoryId,
  toggleQuestion,
  expandedQuestionIds,
  isLoading,
  isError,
}: Props) => {
  const { theme } = useTheme()
  const renderQuestion = useCallback(
    (item: FAQQuestionType) => (
      <View key={item.id}>
        <FaqQuestionItem
          categories={categories}
          expanded={expandedQuestionIds.includes(item.id)}
          item={item}
          toggleQuestion={toggleQuestion}
        />
      </View>
    ),
    [categories, expandedQuestionIds, toggleQuestion]
  )

  if (isLoading) {
    return (
      <Preloader icon="help-buoy" text="Loading questions..." size="small" />
    )
  }

  if (isError) {
    return (
      <EmptyState
        colorIcon="#ff0000ff"
        style={{
          backgroundColor: 'rgba(109, 44, 44, 0.4)',
          borderColor: 'rgba(120, 43, 43, 0.58)',
          borderWidth: 1,
        }}
        icon="warning"
        title="Error"
        description="Try again later or send message to our support team!"
      />
    )
  }

  if (!isLoading && !isError && faq?.length === 0) {
    return (
      <EmptyState
        icon="help-buoy"
        title="Questions not found"
        description="Try again later or send message to our support team!"
      />
    )
  }

  const selectedCategory = categories?.find((c) => c.id === selectedCategoryId)
  const isAllQuestions =
    selectedCategory?.name?.toLowerCase() === 'all questions'

  return (
    <ScrollView
      style={styles.faqContainer}
      contentContainerStyle={styles.faqContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        {isAllQuestions ? 'All Questions' : selectedCategory?.name}{' '}
        {!!faq?.length && `(${faq.length})`}
      </Text>

      {faq && faq?.map(renderQuestion)}

      <View style={styles.helpSection}>
        <Ionicons name="help-buoy" size={48} color="#007AFF" />
        <Text style={[styles.helpTitle, { color: Colors[theme].text }]}>
          Still need help?
        </Text>
        <Text style={styles.helpText}>
          Our support team is here to assist you with any questions or issues
          you might have.
        </Text>

        <TouchableOpacity
          accessibilityRole="button"
          style={styles.helpButton}
          onPress={() => openSupportEmail('FAQ Movie Team')}
        >
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
