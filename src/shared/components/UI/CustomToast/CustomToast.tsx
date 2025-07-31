import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'
import Toast, { BaseToastProps, ToastConfig } from 'react-native-toast-message'

type CustomToastTypes = 'customSuccess' | 'customError' | 'customRemoved'
type ExtendedToastConfig = ToastConfig & {
  [key in CustomToastTypes]: (props: BaseToastProps) => React.ReactNode
}
const CustomToast = () => {
  const config: ExtendedToastConfig = {
    customSuccess: ({ text1 }) => (
      <View style={styles.successToast}>
        <Icon
          source={'check-circle-outline'}
          size={24}
          color={Colors.dark.text}
        />
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
    customRemoved: ({ text1 }) => (
      <View style={styles.removeToast}>
        <Icon source={'trash-can-outline'} size={24} color={Colors.dark.text} />
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
    customError: ({ text1 }) => (
      <View style={styles.errorToast}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
  }
  return <Toast config={config} />
}

export default CustomToast

const styles = StyleSheet.create({
  successToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(21, 223, 78, 1)',
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: '100%',
  },
  removeToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: BaseColors.orangeLight,
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: '100%',
  },
  errorToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: BaseColors.red,
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: '100%',
  },
  toastText: {
    color: BaseColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
