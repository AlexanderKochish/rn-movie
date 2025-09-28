import AccountActions from '@/src/features/profile/components/AccountActions/AccountActions'
import EditAvatar from '@/src/features/profile/components/EditAvatar/EditAvatar'
import EditProfileForm from '@/src/features/profile/components/EditProfileForm/EditProfileForm'
import { useAccountForm } from '@/src/features/profile/hooks/useAccountForm'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function EditProfileScreen() {
  const router = useRouter()
  const { theme, getThemeGradient } = useTheme()
  const {
    control,
    handleSubmit,
    isLoading,
    hasDirtyFields,
    isValid,
    isSuccess,
    avatar,
    handlePickImage,
  } = useAccountForm()

  const isButtonDisabled = !hasDirtyFields || !isValid || isLoading
  const handleSave = async () => {
    if (!hasDirtyFields) {
      router.back()
      return
    }

    handleSubmit()
  }

  return (
    <View
      style={[globalStyles.flex, { backgroundColor: Colors[theme].background }]}
    >
      <LinearGradient colors={getThemeGradient(theme)} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color={Colors[theme].text} />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: Colors[theme].text }]}>
            Edit Profile
          </Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={BaseColors.blueDark} />
            ) : (
              <Text
                style={[
                  styles.saveButtonText,
                  isButtonDisabled && styles.saveButtonTextDisabled,
                ]}
              >
                {isSuccess ? 'Done' : 'Save'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <EditAvatar
          avatar={avatar}
          isLoading={isLoading}
          handlePickImage={handlePickImage}
        />
        <EditProfileForm control={control} />
        <AccountActions />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 1,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 8,
    minWidth: 60,
    alignItems: 'flex-end',
  },
  saveButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 24,
  },
})
