import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import EmptyState from '@/src/shared/components/EmptyState/EmptyState'
import { Movie } from '@/src/shared/types/types'
import { Ionicons } from '@expo/vector-icons'
import React, { ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'

import { Colors } from '@/src/shared/styles/Colors'
import CategoryMovieCard from '../CategoryMovieCard/CategoryMovieCard'

type Props = {
  category: Movie[] | undefined
  isRefetching: boolean
  refetch: () => void
  header: ReactNode
}

const CategoryPage = ({ isRefetching, refetch, category, header }: Props) => {
  const { theme } = useTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      {header}

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => refetch()}
        disabled={isRefetching}
      >
        {isRefetching ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <>
            <Ionicons name="refresh" size={20} color="#64b5f6" />
            <Text style={styles.refreshText}>Update</Text>
          </>
        )}
      </TouchableOpacity>

      <FlatList
        data={category}
        renderItem={({ item, index }) => (
          <CategoryMovieCard movie={item} index={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="film-outline"
            colorIcon="#64b5f6"
            description="Movies not found"
          />
        }
      />
    </View>
  )
}

export default CategoryPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 181, 246, 0.1)',
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(100, 181, 246, 0.3)',
  },
  refreshText: {
    color: '#64b5f6',
    marginLeft: 8,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
})
