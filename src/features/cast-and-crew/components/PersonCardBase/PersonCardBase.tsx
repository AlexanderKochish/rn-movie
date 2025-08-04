import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Link } from 'expo-router'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'

type PersonCardBaseProps = {
  id: number
  name: string
  role: string
  profilePath?: string | null
  fullWidth?: boolean
}

const ITEM_MARGIN = 2
const ITEM_WIDTH = (Dimensions.get('window').width - ITEM_MARGIN * 2) / 2

const PersonCardBase = ({
  id,
  name,
  role,
  profilePath,
  fullWidth = false,
}: PersonCardBaseProps) => {
  const { theme } = useTheme()

  return (
    <Link href={`/person/${id}`} style={{ padding: 5 }}>
      <View
        style={[
          styles.crewItem,
          {
            backgroundColor: Colors[theme].input,
            width: fullWidth ? '100%' : ITEM_WIDTH,
          },
        ]}
      >
        <Image
          source={{
            uri: profilePath
              ? `${process.env.EXPO_PUBLIC_IMG_W300}${profilePath}`
              : process.env.EXPO_PUBLIC_POSTER_HOLDER,
          }}
          style={styles.crewImage}
        />
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          {fullWidth && (
            <Text style={[styles.largeName, { color: Colors[theme].text }]}>
              {name}
            </Text>
          )}
          {!fullWidth && (
            <Text style={[styles.smallName, { color: Colors[theme].text }]}>
              {name.length > 14 ? `${name.slice(0, 14)}...` : name}
            </Text>
          )}

          {fullWidth && (
            <Text style={{ color: Colors[theme].text }}>{role}</Text>
          )}
          {!fullWidth && (
            <Text style={{ color: Colors[theme].text }}>
              {role.length > 14 ? `${role.slice(0, 12)}...` : `${role}`}
            </Text>
          )}
        </View>
      </View>
    </Link>
  )
}

export default PersonCardBase

const styles = StyleSheet.create({
  crewItem: {
    margin: ITEM_MARGIN,
    flexDirection: 'row',
    gap: 10,
    borderRadius: 8,
    padding: 10,
    overflow: 'hidden',
  },
  crewImage: {
    height: 98,
    width: 98,
    borderRadius: 4,
  },
  smallName: {
    fontSize: Typography.body.fontSize,
    fontWeight: 'bold',
  },
  largeName: {
    fontSize: Typography.title.fontSize,
    fontWeight: 'bold',
  },

  role: {
    fontSize: Typography.body.fontSize,
  },
})
