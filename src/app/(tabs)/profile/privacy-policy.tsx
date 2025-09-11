import GoBackButton from '@/src/shared/components/GoBackButton/GoBackButton'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function PrivacyPolicyScreen() {
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<number[]>([])
  const [showFullContent, setShowFullContent] = useState(false)

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const toggleSection = (id: number) => {
    setExpandedSections((prev) =>
      prev.includes(id)
        ? prev.filter((sectionId) => sectionId !== id)
        : [...prev, id]
    )
  }

  const openEmail = () => {
    Linking.openURL(
      'mailto:privacy@movieapp.com?subject=Privacy Policy Inquiry'
    )
  }

  const openTermsOfService = () => {
    router.push('/(tabs)/profile/terms-of-service')
  }

  const openDataRequest = () => {
    Linking.openURL('https://movieapp.com/data-request')
  }

  const sections = [
    {
      id: 1,
      icon: 'document-text',
      title: '1. Introduction',
      content:
        "MovieApp ('we', 'our', 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.",
      expanded: true,
    },
    {
      id: 2,
      icon: 'information-circle',
      title: '2. Information We Collect',
      content: `• Personal Information: Email, username, profile data\n• Usage Data: App interactions, search history, preferences\n• Device Information: Device type, OS version, unique identifiers\n• Location Data: General location for content recommendations (with consent)`,
      expanded: false,
    },
    {
      id: 3,
      icon: 'shield-checkmark',
      title: '3. How We Use Your Information',
      content: `• Provide and maintain our services\n• Personalize your experience\n• Send notifications and updates\n• Improve app functionality\n• Analyze usage patterns\n• Ensure security and prevent fraud`,
      expanded: false,
    },
    {
      id: 4,
      icon: 'share-social',
      title: '4. Data Sharing & Disclosure',
      content:
        'We may share information with:\n• Service providers (analytics, hosting)\n• Legal authorities when required\n• Business partners (with your consent)\n• In connection with business transfers\nWe never sell your personal data to third parties.',
      expanded: false,
    },
    {
      id: 5,
      icon: 'globe',
      title: '5. Data Retention',
      content:
        'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.',
      expanded: false,
    },
    {
      id: 6,
      icon: 'lock-closed',
      title: '6. Data Security',
      content:
        'We implement appropriate security measures including encryption, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure.',
      expanded: false,
    },
    {
      id: 7,
      icon: 'person',
      title: '7. Your Rights',
      content: `• Access and review your data\n• Request data correction\n• Delete your account and data\n• Opt-out of marketing communications\n• Data portability\n• Withdraw consent\nTo exercise these rights, contact us at privacy@movieapp.com`,
      expanded: false,
    },
    {
      id: 8,
      icon: 'earth',
      title: '8. International Transfers',
      content:
        'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers.',
      expanded: false,
    },
    {
      id: 9,
      icon: 'heart',
      title: "9. Children's Privacy",
      content:
        'Our app is not intended for children under 13. We do not knowingly collect information from children. If we learn we have collected such information, we will delete it promptly.',
      expanded: false,
    },
    {
      id: 10,
      icon: 'notifications',
      title: '10. Cookies & Tracking',
      content:
        'We use cookies and similar technologies to analyze app performance, personalize content, and serve targeted advertisements. You can control these through your device settings.',
      expanded: false,
    },
    {
      id: 11,
      icon: 'pencil',
      title: '11. Policy Updates',
      content:
        'We may update this policy periodically. We will notify you of significant changes through the app or email. Continued use constitutes acceptance of changes.',
      expanded: false,
    },
    {
      id: 12,
      icon: 'mail',
      title: '12. Contact Us',
      content:
        'For privacy-related questions or concerns:\nEmail: privacy@movieapp.com\nAddress: 123 Movie Street, San Francisco, CA 94102\nWe respond to all inquiries within 30 days.',
      expanded: false,
    },
  ]

  const abbreviatedContent = sections.slice(0, 4)

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.header}>
        <View style={styles.headerContent}>
          <GoBackButton />

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Privacy Policy</Text>
            <Text style={styles.headerSubtitle}>
              Last updated: {currentDate}
            </Text>
          </View>

          <Ionicons name="shield-checkmark" size={24} color="#007AFF" />
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={styles.introSection}>
          <View style={styles.introIcon}>
            <Ionicons name="shield" size={32} color="#007AFF" />
          </View>
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            We are committed to protecting your personal information and being
            transparent about how we collect, use, and share your data.
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="lock-closed" size={20} color="#4CD964" />
            <Text style={styles.statNumber}>256-bit</Text>
            <Text style={styles.statLabel}>Encryption</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="eye-off" size={20} color="#4CD964" />
            <Text style={styles.statNumber}>No Data</Text>
            <Text style={styles.statLabel}>Sold to Third Parties</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trash" size={20} color="#4CD964" />
            <Text style={styles.statNumber}>30 Days</Text>
            <Text style={styles.statLabel}>Deletion Time</Text>
          </View>
        </View>

        {/* Policy Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionsTitle}>Privacy Policy Details</Text>

          {(showFullContent ? sections : abbreviatedContent).map((section) => (
            <View key={section.id} style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
                activeOpacity={0.7}
              >
                <View style={styles.sectionTitleContent}>
                  <Ionicons
                    name={section.icon as any}
                    size={20}
                    color="#007AFF"
                    style={styles.sectionIcon}
                  />
                  <Text style={styles.sectionTitleText}>{section.title}</Text>
                </View>
                <Ionicons
                  name={
                    expandedSections.includes(section.id)
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>

              {(expandedSections.includes(section.id) || section.expanded) && (
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionContentText}>
                    {section.content}
                  </Text>

                  {section.id === 7 && (
                    <TouchableOpacity
                      style={styles.actionLink}
                      onPress={openEmail}
                    >
                      <Text style={styles.actionLinkText}>
                        Request Data Access
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color="#007AFF"
                      />
                    </TouchableOpacity>
                  )}

                  {section.id === 12 && (
                    <TouchableOpacity
                      style={styles.contactButton}
                      onPress={openEmail}
                    >
                      <Ionicons name="mail" size={16} color="#fff" />
                      <Text style={styles.contactButtonText}>
                        Contact Privacy Team
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}

          {!showFullContent && (
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={() => setShowFullContent(true)}
            >
              <Text style={styles.showMoreText}>Show Full Privacy Policy</Text>
              <Ionicons name="chevron-down" size={16} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={openDataRequest}
          >
            <Ionicons name="download" size={20} color="#007AFF" />
            <View style={styles.actionTextContent}>
              <Text style={styles.actionButtonTitle}>Download Your Data</Text>
              <Text style={styles.actionButtonSubtitle}>
                Get a copy of your personal information
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={openEmail}>
            <Ionicons name="trash" size={20} color="#FF3B30" />
            <View style={styles.actionTextContent}>
              <Text style={styles.actionButtonTitle}>Delete Account</Text>
              <Text style={styles.actionButtonSubtitle}>
                Permanently remove your data
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={openTermsOfService}
          >
            <Ionicons name="document-text" size={20} color="#007AFF" />
            <View style={styles.actionTextContent}>
              <Text style={styles.actionButtonTitle}>Terms of Service</Text>
              <Text style={styles.actionButtonSubtitle}>
                Read our terms and conditions
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Compliance Badges */}
        <View style={styles.complianceSection}>
          <Text style={styles.complianceTitle}>We Comply With</Text>
          <View style={styles.complianceBadges}>
            <View style={styles.badge}>
              <Ionicons name="shield-checkmark" size={16} color="#4CD964" />
              <Text style={styles.badgeText}>GDPR</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="shield-checkmark" size={16} color="#4CD964" />
              <Text style={styles.badgeText}>CCPA</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="shield-checkmark" size={16} color="#4CD964" />
              <Text style={styles.badgeText}>COPPA</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 MovieApp, Inc.</Text>
          <Text style={styles.footerText}>
            All rights reserved • Version 2.1
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  introSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  introIcon: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  introTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  introText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  sectionsContainer: {
    marginBottom: 24,
  },
  sectionsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  sectionTitleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    marginRight: 12,
  },
  sectionTitleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#333',
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
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  showMoreText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  actionTextContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  actionButtonTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionButtonSubtitle: {
    color: '#888',
    fontSize: 12,
  },
  complianceSection: {
    backgroundColor: 'rgba(76, 217, 100, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(76, 217, 100, 0.2)',
  },
  complianceTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  complianceBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 217, 100, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(76, 217, 100, 0.3)',
  },
  badgeText: {
    color: '#4CD964',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
})
