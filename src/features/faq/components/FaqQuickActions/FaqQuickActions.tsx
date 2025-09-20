import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { openSupportEmail } from '@/src/shared/utils/openSupportEmail'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { FAQCategoryType } from '../../types/types'

type Props = {
  categories: FAQCategoryType[] | undefined | null
  selectedCategoryId: string
  setSelectedCategoryId: (id: string) => void
}

const FaqQuickActions = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: Props) => {
  const { theme } = useTheme()

  const openHelpCenter = () => {
    Linking.openURL(process.env.EXPO_PUBLIC_HELP_CENTER ?? '')
  }

  return (
    <View style={{ height: 140 }}>
      <View
        style={[
          styles.quickActions,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openSupportEmail('FAQ Movie Team')}
        >
          <Ionicons name="mail" size={20} color="#007AFF" />
          <Text style={styles.actionText}>Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={openHelpCenter}>
          <Ionicons name="globe" size={20} color="#007AFF" />
          <Text style={styles.actionText}>Help Center</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[
          styles.categoriesContainer,
          {
            backgroundColor: Colors[theme].background,
            borderColor: Colors[theme].border,
          },
        ]}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories?.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { backgroundColor: Colors[theme].chip },
              selectedCategoryId === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategoryId(category.id)}
          >
            <Ionicons
              name={category.icon as ComponentProps<typeof Ionicons>['name']}
              size={16}
              color={selectedCategoryId === category.id ? '#fff' : '#888'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategoryId === category.id && styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default FaqQuickActions

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    height: 60,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
})
