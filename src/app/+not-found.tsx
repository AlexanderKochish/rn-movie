import { Link } from 'expo-router'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../shared/styles/Colors'
import { Typography } from '../shared/styles/Typography'
const notFoundImage = require('../../assets/images/not-found.png')

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={notFoundImage}>
        <SafeAreaView style={styles.content}>
          <Link href="/" replace>
            <Icon source={'arrow-left'} size={24} color={Colors.dark.text} />
          </Link>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              🎬😕 Oops, we didn’t find any matching movies. Try changing your
              search or genre.
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    position: 'relative',
    paddingHorizontal: 15,
    flex: 1,
  },
  title: {
    color: Colors.dark.text,
    fontSize: Typography.title.fontSize,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
})
