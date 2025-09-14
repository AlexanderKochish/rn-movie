import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { Control, FieldValues, Path, UseFormReset } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  reset: UseFormReset<{
    search: string
  }>
  typingText: string
}

const SearchForm = <T extends FieldValues>({
  control,
  name,
  reset,
  typingText,
}: Props<T>) => {
  const { theme } = useTheme()

  const clearSearch = () => reset()
  return (
    <View
      style={[
        styles.searchInputContainer,
        { backgroundColor: Colors[theme].inputBackground },
        { borderColor: Colors[theme].border },
      ]}
    >
      <ControlledTextInput
        control={control}
        name={name}
        mode="flat"
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        cursorColor={Colors[theme].activeTab}
        placeholder="Search movies by title..."
        placeholderTextColor={Colors[theme].placeholder}
        returnKeyType="search"
        theme={{
          colors: {
            text: Colors[theme].text,
            placeholder: Colors[theme].placeholder,
            primary: 'transparent',
          },
        }}
        left={
          <TextInput.Icon
            icon={'magnify'}
            color={Colors[theme].placeholder}
            size={28}
          />
        }
        right={
          typingText.length > 0 && (
            <TextInput.Icon
              onPress={clearSearch}
              icon={'close-circle'}
              color={Colors[theme].placeholder}
              size={20}
            />
          )
        }
        style={styles.input}
      />
    </View>
  )
}

export default SearchForm

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    outlineWidth: 0,
  },
})
