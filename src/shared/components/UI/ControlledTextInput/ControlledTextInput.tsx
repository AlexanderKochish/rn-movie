import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
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
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name })
  const { theme } = useTheme()
  return (
    <View style={globalStyles.flex}>
      <TextInput
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        style={[
          styles.input,
          { backgroundColor: Colors[theme].input, color: Colors[theme].text },
          rest.style,
        ]}
        {...rest}
      />

      {error?.message && <Text style={styles.error}>{error.message}</Text>}
    </View>
  )
}

export default ControlledTextInput

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
  error: {
    color: BaseColors.red,
    fontSize: 12,
    marginTop: 4,
  },
})
