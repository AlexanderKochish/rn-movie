import { Colors } from '@/src/shared/styles/Colors'
import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Dialog, Icon, Portal } from 'react-native-paper'

type Props = {
  visible: boolean
  hideDialog: () => void
  title?: string
  content: ReactNode
}

const RatingModal = ({ hideDialog, visible, content, title }: Props) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
        <View style={styles.innerWrapper}>
          <Pressable onPress={hideDialog} style={styles.close}>
            <Icon source={'close'} color={Colors.dark.text} size={24} />
          </Pressable>
          <View style={styles.contentWrapper}>
            <Dialog.Title style={{ color: Colors.dark.text }}>
              {title}
            </Dialog.Title>
            <Dialog.Content>{content}</Dialog.Content>
          </View>
        </View>
      </Dialog>
    </Portal>
  )
}

export default RatingModal

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.dark.bgModal,
  },
  innerWrapper: {
    height: 124,
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: -5,
    right: 15,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
