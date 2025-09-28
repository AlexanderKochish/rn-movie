import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type PersonCardBaseProps = {
  id: number
  name: string
  role: string
  profilePath?: string | null
  fullWidth?: boolean
}

const PersonCardBase = ({
  id,
  name,
  role: character,
  profilePath,
  fullWidth = false,
}: PersonCardBaseProps) => {
  const { theme } = useTheme()

  return (
    <Link href={`/person/${id}`} style={{ padding: 5 }}>
      <View
        key={id}
        style={[styles.castCard, { backgroundColor: Colors[theme].card }]}
      >
        <Image
          source={{
            uri: profilePath
              ? `${process.env.EXPO_PUBLIC_IMG_W200}${profilePath}`
              : process.env.EXPO_PUBLIC_POSTER_HOLDER,
          }}
          style={styles.castImage}
          resizeMode="cover"
        />
        <Text
          style={[styles.castName, { color: Colors[theme].text }]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text style={styles.castCharacter} numberOfLines={2}>
          {character}
        </Text>
      </View>
    </Link>
  )
}

export default PersonCardBase

const styles = StyleSheet.create({
  castCard: {
    width: 120,
    marginRight: 16,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    height: 190,
  },
  castImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: '#2a2a2a',
  },
  castName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  castCharacter: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
})
