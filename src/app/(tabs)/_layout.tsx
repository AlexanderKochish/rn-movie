import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Ionicons as TabIcon } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()

  const tabBarHeight =
    Platform.OS === 'ios'
      ? 80 + insets.bottom
      : 60 + Math.max(insets.bottom, 16)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].background,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 10,
          height: tabBarHeight,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
        },
        tabBarItemStyle: {
          paddingBottom: Platform.OS === 'android' ? 8 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : undefined}>
              <TabIcon
                size={24}
                name="home-outline"
                color={focused ? BaseColors.orange : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="search/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : undefined}>
              <TabIcon
                size={24}
                name="search"
                color={focused ? BaseColors.orange : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : undefined}>
              <TabIcon
                size={24}
                name="bookmark-outline"
                color={focused ? BaseColors.orange : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : undefined}>
              <TabIcon
                size={24}
                name="person-outline"
                color={focused ? BaseColors.orange : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  focusedTab: {
    backgroundColor: 'rgba(255, 61, 0, 0.3)',
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
