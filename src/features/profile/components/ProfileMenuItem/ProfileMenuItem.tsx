import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Switch } from 'react-native-paper'

type Props = Partial<{
  icon: ComponentProps<typeof Ionicons>['name']
  title: string
  subtitle: string
  isLast: boolean
  hasSwitch: boolean
  value: boolean
  onValueChange: (value: boolean) => void
  onPress: () => void
}>

const ProfileMenuItem = ({
  icon,
  title,
  subtitle,
  isLast = false,
  hasSwitch = false,
  value,
  onValueChange,
  onPress,
}: Props) => {
  const { theme } = useTheme()
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        { borderBottomColor: Colors[theme].border },
        isLast && styles.lastMenuItem,
      ]}
      onPress={!hasSwitch ? onPress : undefined}
      activeOpacity={hasSwitch ? 1 : 0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="#64b5f6" />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={[styles.menuTitle, { color: Colors[theme].text }]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {hasSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#64b5f6' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#64b5f6" />
      )}
    </TouchableOpacity>
  )
}

export default ProfileMenuItem

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(100, 181, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
})
