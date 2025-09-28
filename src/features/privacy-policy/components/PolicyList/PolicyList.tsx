import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { AccordionSection } from '@/src/shared/components/UI/AccordionSection/AccordionSection'
import ExpandButton from '@/src/shared/components/UI/ExpandButton/ExpandButton'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IPrivacyPolicy } from '../../types/types'

interface Props {
  showFullContent: boolean
  sections: IPrivacyPolicy[]
  toggleSection: (id: number) => void
  expandedSections: number[]
  setShowFullContent: (show: boolean) => void
}

const PolicyList = ({
  sections,
  setShowFullContent,
  expandedSections,
  showFullContent,
  toggleSection,
}: Props) => {
  const { theme } = useTheme()
  const abbreviatedContent = sections?.slice(0, 4)

  return (
    <View style={styles.sectionsContainer}>
      <Text style={[styles.sectionsTitle, { color: Colors[theme].text }]}>
        Privacy Policy Details
      </Text>

      {(showFullContent ? sections : abbreviatedContent).map((section) => (
        <AccordionSection
          key={section.id}
          title={section.title}
          icon={section.icon as ComponentProps<typeof Ionicons>['name']}
          expanded={expandedSections.includes(section.id) || section.expanded}
          onToggle={() => toggleSection(section.id)}
        >
          <Text style={styles.sectionContentText}>{section.content}</Text>

          {section.id === 7 && (
            <TouchableOpacity
              style={styles.actionLink}
              onPress={() => openSupportEmail('Privacy Policy Inquiry')}
            >
              <Text style={styles.actionLinkText}>Request Data Access</Text>
              <Ionicons
                name="arrow-forward"
                size={16}
                color={BaseColors.blueDark}
              />
            </TouchableOpacity>
          )}

          {section.id === 12 && (
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => openSupportEmail('Contact Privacy Team')}
            >
              <Ionicons name="mail" size={16} color="#fff" />
              <Text style={styles.contactButtonText}>Contact Privacy Team</Text>
            </TouchableOpacity>
          )}
        </AccordionSection>
      ))}

      {sections.length > 0 && !showFullContent && (
        <ExpandButton onShowMore={setShowFullContent} />
      )}
    </View>
  )
}

export default PolicyList

const styles = StyleSheet.create({
  sectionsContainer: {
    marginBottom: 24,
  },
  sectionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionContentText: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  actionLinkText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
})
