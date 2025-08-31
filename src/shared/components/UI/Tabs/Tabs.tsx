import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

type IoniconsIconName = React.ComponentProps<typeof Ionicons>['name']

interface Tab {
  id: string
  label: string
  iconName: IoniconsIconName
  iconSize?: number
  activeColor?: string
  inactiveColor?: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  containerStyle?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  activeTabStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  activeTextStyle?: StyleProp<TextStyle>
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  containerStyle,
  tabStyle,
  activeTabStyle,
  textStyle,
  activeTextStyle,
}) => {
  return (
    <View style={[styles.tabsContainer, containerStyle]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            tabStyle,
            activeTab === tab.id && [styles.tabActive, activeTabStyle],
          ]}
          onPress={() => onTabChange(tab.id)}
        >
          <Ionicons
            name={tab.iconName}
            size={tab.iconSize || 16}
            color={
              activeTab === tab.id
                ? tab.activeColor || '#007AFF'
                : tab.inactiveColor || '#666'
            }
          />
          <Text
            style={[
              styles.tabText,
              textStyle,
              activeTab === tab.id && [styles.tabTextActive, activeTextStyle],
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Tabs
const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#007AFF',
  },
})
