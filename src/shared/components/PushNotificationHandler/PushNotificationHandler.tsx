import { Button, Text, View } from 'react-native'
import { usePushNotifications } from '../../hooks/usePushNotifications'

const PushNotificationHandler = () => {
  const { notification, sendPushNotification } = usePushNotifications()

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title: {notification && notification.request.content.title}{' '}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{' '}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => await sendPushNotification()}
      />
    </View>
  )
}

export default PushNotificationHandler
