import FaqListQuestions from '@/src/features/faq/components/FaqListQuestions/FaqListQuestions'
import FaqQuickActions from '@/src/features/faq/components/FaqQuickActions/FaqQuickActions'
import { useFaq } from '@/src/features/faq/hooks/useFaq'
import Header from '@/src/shared/components/Header/Header'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function FAQScreen() {
  const {
    faqCategory: categories,
    setSelectedCategoryId,
    selectedCategoryId,
    faq,
    expandedQuestionIds,
    toggleQuestion,
    isLoadingFaq,
    isErrorFaq,
  } = useFaq()

  return (
    <View style={styles.container}>
      <Header
        title="Help & Support"
        subTitle="Frequently Asked Questions"
        goBack
      />
      <FaqQuickActions
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />

      <FaqListQuestions
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        expandedQuestionIds={expandedQuestionIds}
        faq={faq}
        toggleQuestion={toggleQuestion}
        isLoading={isLoadingFaq}
        isError={isErrorFaq}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})
