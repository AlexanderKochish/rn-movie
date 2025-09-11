import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors } from '@/src/shared/styles/Colors'
import React from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput, TextInputProps } from 'react-native-paper'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  rules?: object
} & TextInputProps

const ControlledTextInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name })
  const { theme } = useTheme()
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        {...rest}
        style={{
          borderWidth: 0,
          borderColor: '#007AFF',
          color: 'transparent',
          backgroundColor: 'transparent',
          borderRadius: 16,
        }}
      />

      {error?.message && <Text style={styles.error}>{error.message}</Text>}
    </View>
  )
}

export default ControlledTextInput

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  error: {
    color: BaseColors.red,
    fontSize: 12,
    marginTop: 4,
  },
})
