import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

type Props = {
  title?: string
  source: string | undefined
  releaseYear: string
  voteAverage: number
  id: number
}

const SearchItemCard = ({
  title,
  source,
  releaseYear,
  voteAverage,
  id,
}: Props) => {
  const { theme } = useTheme()
  return (
    <View style={styles.card}>
      <Link
        href={{ pathname: '/movie/[movieId]', params: { movieId: id } }}
        push
      >
        <Image
          style={styles.poster}
          source={{ uri: source || `${process.env.EXPO_PUBLIC_POSTER_HOLDER}` }}
        />
      </Link>
      <View style={styles.content}>
        <Text style={[styles.title, { color: Colors[theme].text }]}>
          {title}
        </Text>
        <Text style={styles.release}>{releaseYear.slice(0, 4)} - Action</Text>
        <View style={styles.bottomInfo}>
          <View style={styles.timeBlock}>
            <Icon
              source={'clock-outline'}
              size={24}
              color={Colors[theme].text}
            />
            <Text style={[styles.time, { color: Colors[theme].text }]}>
              120 mins
            </Text>
          </View>

          <View style={styles.voteAverage}>
            <Text style={{ color: Colors[theme].text }}>
              {voteAverage.toFixed(1)}
            </Text>
            <Icon source={'star'} size={24} color={Colors[theme].ratingStar} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default SearchItemCard

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
  },
  poster: {
    width: 140,
    height: 200,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingVertical: 15,
    gap: 20,
  },
  title: {
    fontSize: Typography.title.fontSize,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  release: {
    color: BaseColors.orange,
    fontSize: Typography.body.fontSize,
  },
  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeBlock: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  time: {
    alignItems: 'center',
  },
  voteAverage: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
})
