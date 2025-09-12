import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Control, FieldValues, Path, UseFormReset } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'

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
      <Ionicons
        name="search"
        size={20}
        color={Colors[theme].placeholder}
        style={styles.searchIcon}
      />
      <ControlledTextInput
        placeholder="Search movies by title..."
        placeholderTextColor={Colors[theme].placeholder}
        control={control}
        name={name}
        returnKeyType="search"
      />
      {typingText.length > 0 && (
        <IconButton
          icon="close-circle"
          size={20}
          iconColor={Colors[theme].placeholder}
          onPress={clearSearch}
          style={styles.clearButton}
        />
      )}
    </View>
  )
}

export default SearchForm

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  clearButton: {
    padding: 4,
  },
})
