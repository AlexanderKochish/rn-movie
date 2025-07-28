import MovieCard from '@/src/features/movie/components/MovieCard/MovieCard'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import { MovieUnionType } from '@/src/shared/types/types'
import { Href, useRouter } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, Icon, IconButton } from 'react-native-paper'

type Props<T extends MovieUnionType> = {
  items: T[] | undefined
  title?: string
  icon?: string
  isLoading: boolean
  link?: Href
}

const MoviesRow = <T extends MovieUnionType>({
  items,
  title,
  icon,
  isLoading,
  link,
}: Props<T>) => {
  const { theme } = useTheme()
  const router = useRouter()
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleWrapper}>
        <View style={styles.title}>
          {icon && <Icon source={icon} size={24} color={Colors[theme].text} />}
          {title && (
            <Text
              style={[globalStyles.subTitle, { color: Colors[theme].text }]}
            >
              {title}
            </Text>
          )}
        </View>
        {link && (
          <IconButton
            icon={'chevron-right'}
            size={24}
            iconColor={Colors[theme].text}
            onPress={() => router.push(link)}
          />
        )}
      </View>
      {!items && (
        <Text style={{ color: Colors[theme].text, paddingVertical: 10 }}>
          List is empty
        </Text>
      )}
      {isLoading && (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={BaseColors.orange}
          />
        </View>
      )}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            imageUrl={`${process.env.EXPO_PUBLIC_IMG_W300}${item.poster_path || item.backdrop_path}`}
            title={item.title || item.original_title}
            vote_average={item.vote_average}
          />
        )}
      />
    </View>
  )
}

export default MoviesRow

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})
