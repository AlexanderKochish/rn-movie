import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ColorValue, StyleSheet, Text, View } from 'react-native'
import GoBackButton from '../GoBackButton/GoBackButton'

type Props = {
  title: string
  subTitle?: string
  gradientColors?: readonly [ColorValue, ColorValue, ...ColorValue[]]
  goBack?: boolean
}

const Header = ({
  title,
  subTitle,
  gradientColors = ['#1a1a1a', '#2a2a2a'],
  goBack,
}: Props) => {
  return (
    <LinearGradient colors={gradientColors} style={styles.header}>
      {goBack && <GoBackButton />}
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subTitle && <Text style={styles.headerSubtitle}>{subTitle}</Text>}
      </View>
    </LinearGradient>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    textAlign: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#888',
    fontSize: 14,
  },
})
