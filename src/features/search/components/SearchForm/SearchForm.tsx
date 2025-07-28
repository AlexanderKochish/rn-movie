import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { TextInput } from 'react-native-paper'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
}

const SearchForm = <T extends FieldValues>({ control, name }: Props<T>) => {
  const { theme } = useTheme()

  return (
    <ControlledTextInput
      control={control}
      name={name}
      style={{
        backgroundColor: Colors[theme].input,
        color: Colors[theme].text,
      }}
      left={
        <TextInput.Icon
          icon={'magnify'}
          size={24}
          color={theme === 'dark' ? Colors.dark.text : BaseColors.orange}
        />
      }
      placeholder="Search here..."
      textColor={Colors[theme].text}
    />
  )
}

export default SearchForm
