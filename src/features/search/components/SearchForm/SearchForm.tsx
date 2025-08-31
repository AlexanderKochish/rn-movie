import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Control, FieldValues, Path, UseFormReset } from 'react-hook-form'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

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
    <View style={styles.searchInputContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#666"
        style={styles.searchIcon}
      />
      <ControlledTextInput
        style={styles.searchInput}
        placeholder="Search movies by title..."
        placeholderTextColor="#666"
        control={control}
        name={name}
        returnKeyType="search"
      />
      {typingText.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchForm

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 14,
  },
  clearButton: {
    padding: 4,
  },
})
