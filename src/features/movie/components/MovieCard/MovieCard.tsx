import { Colors } from '@/src/shared/styles/Colors'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'

type Props = {
  imageUrl: string
  title?: string
  vote_average?: number
  id: number
}

const MovieCard = ({ imageUrl, title, vote_average, id }: Props) => {
  return (
    <View style={styles.card}>
      <Link href={{ pathname: `/movie/[movieId]`, params: { movieId: id } }}>
        <Image
          source={{
            uri: `${imageUrl}`,
          }}
          style={styles.cardImage}
          contentFit="cover"
        />
      </Link>
      <Text style={{ color: Colors.dark.text }}>
        {title && title?.length > 16
          ? `${title?.slice(0, 16)}...`
          : title || 'No Title'}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: 'gray' }}>167 mins</Text>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Icon source="star" size={20} color="yellow" />
          <Text style={{ color: Colors.dark.text }}>
            {vote_average?.toFixed(1)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  card: { width: 150, margin: 5 },
  cardImage: {
    width: 150,
    height: 210,
    marginRight: 12,
    borderRadius: 10,
  },
})
