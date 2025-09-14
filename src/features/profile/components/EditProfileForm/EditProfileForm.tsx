import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import React from 'react'
import { Control } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import { useProfile } from '../../hooks/useProfile'
import { accountSchemaType } from '../../lib/zod/account.schema'

type Props = {
  control: Control<accountSchemaType>
}

const EditProfileForm = ({ control }: Props) => {
  const { profile } = useProfile()
  const { theme } = useTheme()
  const isDark = theme === 'dark' ? 'light' : 'dark'

  return (
    <KeyboardAvoidingView
      style={globalStyles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.form, isDark && styles.darkForm]}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <ControlledTextInput
          control={control}
          name="fullName"
          textColor={isDark ? '#fff' : '#000'}
          mode="outlined"
          left={
            <TextInput.Icon
              icon={'pen'}
              color={isDark ? '#64b5f6' : '#007AFF'}
            />
          }
          defaultValue={profile?.full_name}
          style={styles.input}
          placeholder="Enter your full name"
          label={'Full name'}
          placeholderTextColor={isDark ? '#888' : '#666'}
          outlineColor={isDark ? '#333' : '#ddd'}
          activeOutlineColor={isDark ? '#64b5f6' : '#007AFF'}
        />

        <ControlledTextInput
          control={control}
          name="username"
          textColor={isDark ? '#fff' : '#000'}
          mode="outlined"
          left={
            <TextInput.Icon
              icon={'lead-pencil'}
              color={isDark ? '#64b5f6' : '#007AFF'}
            />
          }
          label={'Username'}
          placeholderTextColor={isDark ? '#888' : '#666'}
          outlineColor={isDark ? '#333' : '#ddd'}
          activeOutlineColor={isDark ? '#64b5f6' : '#007AFF'}
          style={styles.input}
        />

        <ControlledTextInput
          control={control}
          name="email"
          style={[styles.disabledInput]}
          textColor={isDark ? '#fff' : '#000'}
          mode="outlined"
          left={
            <TextInput.Icon
              icon={'email'}
              color={isDark ? '#64b5f6' : '#007AFF'}
            />
          }
          value={profile?.email}
          placeholderTextColor={isDark ? '#888' : '#666'}
          outlineColor={isDark ? '#333' : '#ddd'}
          activeOutlineColor={isDark ? '#64b5f6' : '#007AFF'}
          defaultValue={profile?.email}
          disabled={true}
        />

        <ControlledTextInput
          style={styles.input}
          control={control}
          name="age"
          textColor={isDark ? '#fff' : '#000'}
          mode="outlined"
          keyboardType="number-pad"
          left={
            <TextInput.Icon
              icon={'pencil-outline'}
              color={isDark ? '#64b5f6' : '#007AFF'}
            />
          }
          label={'Age'}
          placeholderTextColor={isDark ? '#888' : '#666'}
          outlineColor={isDark ? '#333' : '#ddd'}
          activeOutlineColor={isDark ? '#64b5f6' : '#007AFF'}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default EditProfileForm

const styles = StyleSheet.create({
  form: {
    width: '100%',
    gap: 5,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkForm: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
  },

  disabledInput: {
    backgroundColor: 'transparent',
    borderColor: '#888',
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
