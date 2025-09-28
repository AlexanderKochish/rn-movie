import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import { AccordionSection } from '@/src/shared/components/UI/AccordionSection/AccordionSection'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import { Ionicons } from '@expo/vector-icons'
import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { FAQCategoryType, FAQQuestionType } from '../../types/types'

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
      <AccordionSection
        key={item.id}
        title={item.question}
        expanded={expandedQuestionIds.includes(item.id)}
        onToggle={() => toggleQuestion(item.id)}
        containerStyle={styles.accordionItem}
      >
        <Text style={styles.answerText}>{item.answer}</Text>

        {categories?.some((c) => c.name === 'Technical') && (
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.supportLink}
            onPress={() => openSupportEmail('FAQ Technical Support')}
          >
            <Text style={styles.supportLinkText}>Contact support now</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={BaseColors.blueDark}
            />
          </TouchableOpacity>
        )}
      </AccordionSection>
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
        colorIcon={BaseColors.red}
        style={globalStyles.introSectionError}
        icon="warning"
        title="Error"
        description="Try again later or contact support."
      />
    )
  }

  if (!isLoading && !isError && faq?.length === 0) {
    return (
      <EmptyState
        icon="help-buoy"
        title="Questions not found"
        description="Try again later or contact support."
      />
    )
  }

  const selectedCategory = categories?.find((c) => c.id === selectedCategoryId)
  const isAllQuestions =
    selectedCategory?.name?.toLowerCase() === 'all questions'

  return (
    <ScrollView
      style={globalStyles.flex}
      contentContainerStyle={styles.faqContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
        {isAllQuestions ? 'All Questions' : selectedCategory?.name}{' '}
        {!!faq?.length && `(${faq.length})`}
      </Text>

      {faq?.map(renderQuestion)}

      <View style={styles.helpSection}>
        <Ionicons name="help-buoy" size={48} color={BaseColors.blueDark} />
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
          onPress={() => openSupportEmail('FAQ Watcher Team')}
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
  faqContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accordionItem: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
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
    marginTop: 8,
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
