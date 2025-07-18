import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.background,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            backgroundColor: Colors.dark.background,
            borderTopWidth: 0,
            elevation: 0,
            height: 80,
            paddingTop: 10,
            paddingBottom: 10,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : undefined}>
              <MaterialIcons
                size={32}
                name="home"
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
              <MaterialIcons
                size={32}
                name="search"
                color={focused ? BaseColors.orange : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="bookmarks/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : undefined}>
              <MaterialIcons
                size={32}
                name="bookmark"
                color={focused ? BaseColors.orange : color}
              />
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.focusedTab : undefined}>
              <MaterialIcons
                size={32}
                name="account-circle"
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
