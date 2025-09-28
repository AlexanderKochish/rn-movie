import Footer from '@/src/features/home/components/Footer/Footer'
import PolicyList from '@/src/features/privacy-policy/components/PolicyList/PolicyList'
import QuickActions from '@/src/features/privacy-policy/components/QuickActions/QuickActions'
import { usePrivacyPolicy } from '@/src/features/privacy-policy/hooks/usePrivacyPolicy'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import Header from '@/src/shared/components/Header/Header'
import Preloader from '@/src/shared/components/UI/Preloader/Preloader'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { currentDate } from '@/src/shared/utils/currentDate'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function PrivacyPolicyScreen() {
  const { theme } = useTheme()
  const {
    sections,
    toggleSection,
    setShowFullContent,
    showFullContent,
    expandedSections,
    isLoading,
    isError,
  } = usePrivacyPolicy()

  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <Header
        title="Privacy Policy"
        subTitle={`Last updated: ${currentDate}`}
        goBack
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && <Preloader icon="document-text" text="Loading..." />}
        <EmptyState
          colorIcon={BaseColors.blueDark}
          icon="shield"
          style={globalStyles.introSection}
          iconSize={32}
          title=" Your Privacy Matters"
          description="We are committed to protecting your personal information and being
            transparent about how we collect, use, and share your data."
        />

        {!isLoading && !isError && sections?.length === 0 && (
          <EmptyState
            style={globalStyles.introSection}
            title="No privacy policy available"
            description="The privacy policy is not available right now. Please check back later."
            icon="shield"
          />
        )}
        {isError && (
          <EmptyState
            title="Error"
            icon="warning"
            colorIcon={BaseColors.red}
            description="Try again later or send message to our support team!"
          />
        )}

        {sections && (
          <PolicyList
            toggleSection={toggleSection}
            setShowFullContent={setShowFullContent}
            showFullContent={showFullContent}
            expandedSections={expandedSections}
            sections={sections}
          />
        )}

        <QuickActions />

        <Footer
          title="© 2024 Watcher, Inc."
          subtitle="All rights reserved • Version 2.1"
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
})
