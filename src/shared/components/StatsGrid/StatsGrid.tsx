import { useProfile } from '@/src/features/profile/hooks/useProfile'
import { useProfileStatistics } from '@/src/features/profile/hooks/useProfileStatistics'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BaseColors, Colors } from '../../styles/Colors'

const StatsGrid = () => {
  const { profile } = useProfile()
  const { data } = useProfileStatistics(profile?.id!)
  const { theme } = useTheme()
  const stats = [
    {
      icon: 'heart',
      label: 'Watchlist',
      value: data?.liked_movies,
      color: BaseColors.red,
    },
    {
      icon: 'star',
      label: 'Ratings',
      value: data?.ratings,
      color: BaseColors.yellow,
    },
    // {
    //   icon: 'eye',
    //   label: 'Watched',
    //   value: data?.watched,
    //   color: BaseColors.green,
    // },
    // { icon: 'time', label: 'Hours', value: 0, color: BaseColors.blueDark },
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
            {stat.value ?? 0}
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
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
})
