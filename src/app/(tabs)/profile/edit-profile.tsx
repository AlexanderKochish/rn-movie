import AccountActions from '@/src/features/profile/components/AccountActions/AccountActions'
import EditAvatar from '@/src/features/profile/components/EditAvatar/EditAvatar'
import EditProfileForm from '@/src/features/profile/components/EditProfileForm/EditProfileForm'
import { useAccountForm } from '@/src/features/profile/hooks/useAccountForm'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
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
  const {
    control,
    handleSubmit,
    isLoading,
    isDirty,
    isSuccess,
    avatar,
    handlePickImage,
  } = useAccountForm()

  const isButtonDisabled = !isDirty || isLoading
  const handleSave = async () => {
    if (!isDirty) {
      router.back()
      return
    }

    handleSubmit()
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Profile</Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#007AFF" />
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
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    gap: 16,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 8,
    minWidth: 60,
    alignItems: 'flex-end',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
