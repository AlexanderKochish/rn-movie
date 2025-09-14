import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ColorValue, StyleSheet, Text, View } from 'react-native'
import GoBackButton from '../GoBackButton/GoBackButton'

type Props = {
  title: string
  subTitle?: string
  gradientColors?: {
    light: readonly [ColorValue, ColorValue, ...ColorValue[]]
    dark: readonly [ColorValue, ColorValue, ...ColorValue[]]
  }
  goBack?: boolean
}

const Header = ({ title, subTitle, gradientColors, goBack }: Props) => {
  const { theme } = useTheme()

  const getGradientColors = () => {
    if (gradientColors) {
      return theme === 'light' ? gradientColors.light : gradientColors.dark
    }

    return theme === 'light'
      ? (['#f8f9fa', '#e9ecef'] as const)
      : (['#0e0e0eff', '#1a1a1aff', '#212121ff'] as const)
  }

  const titleColor = theme === 'light' ? '#000' : '#fff'
  const subtitleColor = theme === 'light' ? '#666' : '#888'
  return (
    <LinearGradient colors={getGradientColors()} style={styles.header}>
      {goBack && <GoBackButton />}
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: titleColor }]}>{title}</Text>
        {subTitle && (
          <Text style={[styles.headerSubtitle, { color: subtitleColor }]}>
            {subTitle}
          </Text>
        )}
      </View>
    </LinearGradient>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
})
