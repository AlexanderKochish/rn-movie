import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
)

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
