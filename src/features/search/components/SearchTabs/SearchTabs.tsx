import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import Tabs from '@/src/shared/components/UI/Tabs/Tabs'
import { Colors } from '@/src/shared/styles/Colors'
import React, { useState } from 'react'
import DiscoverTab from '../DiscoverTab/DiscoverTab'
import SearchTab from '../SearchTab/SearchTab'

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState('search')
  const { theme } = useTheme()
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }
  const tabs = [
    {
      id: 'search',
      label: 'Search',
      iconName: 'search' as const,
      activeColor: Colors[theme].activeTab,
      inactiveColor: Colors[theme].inactiveColor,
    },
    {
      id: 'discover',
      label: 'Discover',
      iconName: 'compass' as const,
      activeColor: Colors[theme].activeTab,
      inactiveColor: Colors[theme].inactiveColor,
    },
  ]

  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'discover' && <DiscoverTab />}
      {activeTab === 'search' && <SearchTab />}
    </>
  )
}

export default SearchTabs
