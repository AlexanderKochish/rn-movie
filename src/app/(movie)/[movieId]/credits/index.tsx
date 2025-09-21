import CastCard from '@/src/features/cast-and-crew/components/CastCard/CastCard'
import CrewList from '@/src/features/cast-and-crew/components/CrewList/CrewList'
import { useCredits } from '@/src/features/cast-and-crew/hooks/useCredits'
import { useMovieId } from '@/src/features/movie/hooks/useMovieId'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

const CreditsScreen = () => {
  const movieId = useMovieId()
  const { credits } = useCredits(movieId)
  const { theme } = useTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <CrewList fullWidth={true} crew={credits?.crew} orientation={false} />
        }
        data={credits?.cast}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CastCard fullWidth={true} person={item} />}
      />
    </View>
  )
}

export default CreditsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
