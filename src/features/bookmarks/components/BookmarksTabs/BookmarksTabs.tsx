import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Tabs from '@/src/shared/components/UI/Tabs/Tabs'
import { Colors } from '@/src/shared/styles/Colors'
import React, { useState } from 'react'
import { useBookmark } from '../../hooks/useBookmark'
import { useFavorite } from '../../hooks/useFavorite'
import LibraryCollection from '../LibraryCollection/LibraryCollection'

const BookmarksTabs = () => {
  const [activeTab, setActiveTab] = useState('favorites')
  const { theme } = useTheme()
  const {
    items: favorites,
    isLoading: isLoadingFavorite,
    toggleItem: toogleFavorite,
    isError: isErrorFavorites,
  } = useFavorite()
  const {
    items: bookmarks,
    isLoading: isLoadingBookmark,
    toggleItem: toogleBookmark,
    isError: isErrorBookmarks,
  } = useBookmark()

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }
  const tabs = [
    {
      id: 'favorites',
      label: 'Favorites',
      iconName: 'heart' as const,
      activeColor: Colors[theme].activeTab,
      inactiveColor: Colors[theme].inactiveColor,
    },
    {
      id: 'rated',
      label: 'Rated',
      iconName: 'star' as const,
      activeColor: Colors[theme].activeTab,
      inactiveColor: Colors[theme].inactiveColor,
    },
    {
      id: 'watchlist',
      label: 'Watchlist',
      iconName: 'search' as const,
      activeColor: Colors[theme].activeTab,
      inactiveColor: Colors[theme].inactiveColor,
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
          isError={isErrorFavorites}
        />
      )}
      {activeTab === 'rated' && <></>}
      {activeTab === 'watchlist' && (
        <LibraryCollection
          collection={bookmarks}
          isLoading={isLoadingBookmark}
          activeTab="watchlist"
          toggleItem={toogleBookmark}
          isError={isErrorBookmarks}
        />
      )}
    </>
  )
}

export default BookmarksTabs
