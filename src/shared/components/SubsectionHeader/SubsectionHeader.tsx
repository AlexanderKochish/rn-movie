import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '@/src/shared/styles/globalStyles'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import { Icon } from 'react-native-paper'
import { Href, useRouter } from 'expo-router'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'

type Props = {
  link?: Href
  title?: string
}

const SubsectionHeader = ({ link, title }: Props) => {
  const { theme } = useTheme()
  const router = useRouter()
  return (
    <View style={styles.titleWrapper}>
      <Text style={[globalStyles.subTitle, { color: Colors[theme].text }]}>
        {title}
      </Text>
      {link && (
        <CustomButton
          title="See all"
          variant="secondary"
          fullWidth={false}
          size="small"
          icon={
            <Icon
              source={'chevron-right'}
              size={24}
              color={Colors[theme].text}
            />
          }
          onPress={() => router.push(link)}
        />
      )}
    </View>
  )
}

export default SubsectionHeader

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
