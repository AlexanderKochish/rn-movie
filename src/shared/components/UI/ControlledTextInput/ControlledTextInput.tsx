import React from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TextInputProps } from 'react-native-paper'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  rules?: object
} & TextInputProps

const ControlledTextInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name })
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        error={!!error}
      />

      {error?.message && <Text style={styles.error}>{error.message}</Text>}
    </View>
  )
}

export default ControlledTextInput

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#ccc',
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'transparent',
  },
  error: {
    color: 'tomato',
    fontSize: 12,
    marginTop: 4,
  },
})
