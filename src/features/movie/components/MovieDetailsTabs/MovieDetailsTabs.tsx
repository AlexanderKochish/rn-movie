import Tabs from '@/src/shared/components/UI/Tabs/Tabs'
import { MovieDetailsType } from '@/src/shared/types/types'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import MovieCast from '../MovieCast/MovieCast'
import MovieDetails from '../MovieDetails/MovieDetails'
import MovieOverview from '../MovieOverview/MovieOverview'

type Props = {
  movie: MovieDetailsType
}

const MovieDetailsTabs = ({ movie }: Props) => {
  const [activeTab, setActiveTab] = useState('overview')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      iconName: 'compass' as const,
      activeColor: '#007AFF',
      inactiveColor: '#666',
    },
    {
      id: 'cast',
      label: 'Cast',
      iconName: 'compass' as const,
      activeColor: '#007AFF',
      inactiveColor: '#666',
    },
    {
      id: 'details',
      label: 'Details',
      iconName: 'search' as const,
      activeColor: '#007AFF',
      inactiveColor: '#666',
    },
  ]
  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'overview' && <MovieOverview movie={movie} />}
        {activeTab === 'cast' && <MovieCast />}
        {activeTab === 'details' && <MovieDetails />}
      </ScrollView>
    </>
  )
}

export default MovieDetailsTabs

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
})
