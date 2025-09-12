import { useBookmark } from '@/src/features/bookmarks/hooks/useBookmark'
import { useFavorite } from '@/src/features/bookmarks/hooks/useFavorite'
import { useProfile } from '@/src/features/profile/hooks/useProfile'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import React, { ComponentProps } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { supabase } from '../../services/supabase'
import { Colors } from '../../styles/Colors'

const StatsGrid = () => {
  const { profile } = useProfile()
  const { items } = useBookmark()
  const { items: favorites } = useFavorite()
  const { theme } = useTheme()

  const { data } = useQuery({
    queryKey: ['ratings-result'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('user_id', profile?.id)

      if (error) throw error

      return data
    },
  })

  const stats = [
    {
      icon: 'heart',
      label: 'Watchlist',
      value: favorites?.length,
      color: '#FF3B30',
    },
    { icon: 'star', label: 'Ratings', value: data?.length, color: '#FFCC00' },
    { icon: 'eye', label: 'Watched', value: items?.length, color: '#34C759' },
    { icon: 'time', label: 'Hours', value: 0, color: '#007AFF' },
  ]
  return (
    <View style={styles.statsGrid}>
      {stats.map((stat, index) => (
        <View
          key={index}
          style={[
            styles.statItem,
            {
              backgroundColor: Colors[theme].stats,
              borderColor: Colors[theme].border,
            },
          ]}
        >
          <View
            style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}
          >
            <Ionicons
              name={stat.icon as ComponentProps<typeof Ionicons>['name']}
              size={20}
              color={stat.color}
            />
          </View>
          <Text style={[styles.statValue, { color: Colors[theme].text }]}>
            {stat.value}
          </Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  )
}

export default StatsGrid

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statItem: {
    width: '48%',
    // backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: '#333',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
})
