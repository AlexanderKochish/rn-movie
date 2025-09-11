import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import React from 'react'
import { Control } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { useProfile } from '../../hooks/useProfile'
import { accountSchemaType } from '../../lib/zod/account.schema'

type Props = {
  control: Control<accountSchemaType>
}

const EditProfileForm = ({ control }: Props) => {
  const { profile } = useProfile()

  return (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <ControlledTextInput
          control={control}
          mode="outlined"
          name="fullName"
          defaultValue={profile?.full_name}
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Username</Text>
        <ControlledTextInput
          control={control}
          name="username"
          mode="outlined"
          style={styles.input}
          placeholder="Choose a username"
          defaultValue={profile?.username}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <ControlledTextInput
          control={control}
          name="email"
          mode="outlined"
          style={[styles.input, styles.disabledInput]}
          placeholder={profile?.email}
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={false}
        />
        <Text style={styles.inputHelp}>
          Email cannot be changed. Contact support if needed.
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Age</Text>
        <ControlledTextInput
          style={styles.input}
          control={control}
          name="age"
          mode="outlined"
          placeholder="Your age"
          defaultValue={String(profile?.age)}
          placeholderTextColor="#666"
          keyboardType="number-pad"
          maxLength={3}
        />
      </View>
    </View>
  )
}

export default EditProfileForm

const styles = StyleSheet.create({
  formSection: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    gap: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  disabledInput: {
    opacity: 0.7,
    color: '#888',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputHelp: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  charCount: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
})
