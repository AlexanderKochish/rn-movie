import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Colors } from '../../styles/Colors'

const SectionHeader = ({ title }: { title: string }) => {
  const { theme } = useTheme()
  return (
    <View style={styles.sectionHeader}>
      <Text
        style={[
          styles.sectionHeaderText,
          { color: Colors[theme].settingsSectionTitle },
        ]}
      >
        {title}
      </Text>
    </View>
  )
}
export default SectionHeader

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  sectionHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64b5f6',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
})
