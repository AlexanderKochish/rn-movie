import FaqListQuestions from '@/src/features/faq/components/FaqListQuestions/FaqListQuestions'
import FaqQuickActions from '@/src/features/faq/components/FaqQuickActions/FaqQuickActions'
import { useFaq } from '@/src/features/faq/hooks/useFaq'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Header from '@/src/shared/components/Header/Header'
import { Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import React from 'react'
import { View } from 'react-native'

export default function FAQScreen() {
  const { theme } = useTheme()
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
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
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
