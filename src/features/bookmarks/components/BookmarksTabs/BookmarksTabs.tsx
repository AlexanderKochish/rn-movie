import { useBookmark } from '@/src/features/movie/hooks/useBookmark'
import { useFavorite } from '@/src/features/movie/hooks/useFavorite'
import Tabs from '@/src/shared/components/UI/Tabs/Tabs'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import LibraryCollection from '../LibraryCollection/LibraryCollection'

const BookmarksTabs = () => {
  const [activeTab, setActiveTab] = useState('favorites')
  const {
    items: favorites,
    isLoading: isLoadingFavorite,
    toggleItem: toogleFavorite,
  } = useFavorite()
  const {
    items: bookmarks,
    isLoading: isLoadingBookmark,
    toggleItem: toogleBookmark,
  } = useBookmark()

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }
  const tabs = [
    {
      id: 'favorites',
      label: 'Favorites',
      iconName: 'heart' as const,
      activeColor: '#007AFF',
      inactiveColor: '#666',
    },
    {
      id: 'rated',
      label: 'Rated',
      iconName: 'star' as const,
      activeColor: '#007AFF',
      inactiveColor: '#666',
    },
    {
      id: 'watchlist',
      label: 'Watchlist',
      iconName: 'search' as const,
      activeColor: '#007AFF',
      inactiveColor: '#666',
    },
  ]
  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'favorites' && (
        <LibraryCollection
          collection={favorites}
          isLoading={isLoadingFavorite}
          activeTab="favorites"
          toggleItem={toogleFavorite}
        />
      )}
      {activeTab === 'rated' && <></>}
      {activeTab === 'watchlist' && (
        <LibraryCollection
          collection={bookmarks}
          isLoading={isLoadingBookmark}
          activeTab="watchlist"
          toggleItem={toogleBookmark}
        />
      )}
    </>
  )
}

export default BookmarksTabs

const styles = StyleSheet.create({})
