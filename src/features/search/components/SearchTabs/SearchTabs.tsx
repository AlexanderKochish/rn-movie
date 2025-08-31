import Tabs from '@/src/shared/components/UI/Tabs/Tabs'
import React, { useState } from 'react'
import DiscoverTab from '../DiscoverTab/DiscoverTab'
import SearchTab from '../SearchTab/SearchTab'

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState('search')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }
  const tabs = [
    {
      id: 'search',
      label: 'Search',
      iconName: 'search' as const,
      activeColor: '#007AFF',
      inactiveColor: '#666',
    },
    {
      id: 'discover',
      label: 'Discover',
      iconName: 'compass' as const,
      activeColor: '#007AFF',
      inactiveColor: '#666',
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
