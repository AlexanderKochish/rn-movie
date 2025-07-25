import { Colors } from '@/src/shared/styles/Colors'
import { CrewMember } from '@/src/shared/types/types'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

type Props = {
  person: CrewMember
}

const ITEM_MARGIN = 10
const ITEM_WIDTH = (Dimensions.get('window').width - ITEM_MARGIN * 3) / 2

const CastAndCrewCard = ({ person }: Props) => {
  return (
    <View style={styles.crewItem}>
      <Image
        source={
          person.profile_path
            ? {
                uri: `${process.env.EXPO_PUBLIC_IMG_W300}${person?.profile_path}`,
              }
            : {
                uri: process.env.EXPO_PUBLIC_POSTER_HOLDER,
              }
        }
        style={styles.crewImage}
      />
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <Text style={styles.text}>{person.name || person.original_name}</Text>
        <Text style={styles.text}>{person.job.slice(0, 12)}...</Text>
      </View>
    </View>
  )
}

export default CastAndCrewCard

const styles = StyleSheet.create({
  crewItem: {
    width: ITEM_WIDTH,
    margin: ITEM_MARGIN,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    overflow: 'hidden',
  },
  crewImage: {
    height: 68,
    width: 68,
    borderRadius: 4,
    backgroundColor: Colors.dark.bgModal,
  },
  text: {
    color: Colors.dark.text,
  },
})
