import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import { Colors } from '@/src/shared/styles/Colors'

import React from 'react'
import { StyleSheet, View } from 'react-native'

const AccountScreen = () => {
  const { user } = useAuth()
  const { theme } = useTheme()
  // const { control, handleSubmit, avatar, handlePickImage } = useAccountForm()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme].background,
        },
      ]}
    >
      {/* <Controller
        control={control}
        name="avatar"
        render={() => (
          <View style={styles.imageWrapper}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.image} />
            ) : (
              <Avatar.Image
                source={
                  user?.photoURL
                    ? { uri: user.photoURL }
                    : require('../../../../assets/images/profile-placeholder.png')
                }
                size={200}
              />
            )}
            <Button
              labelStyle={{ fontSize: Typography.title.fontSize }}
              icon={'upload'}
              onPress={handlePickImage}
            >
              Upload your image
            </Button>
          </View>
        )}
      />

      <View style={{ gap: 15 }}>
        <ControlledTextInput
          label={'Username'}
          mode={'outlined'}
          control={control}
          name={'username'}
        />
        <ControlledTextInput
          label={'Full Name'}
          mode={'outlined'}
          control={control}
          name={'fullName'}
        />
        <ControlledTextInput
          label={'Your age'}
          mode={'outlined'}
          control={control}
          name={'age'}
          keyboardType="numeric"
        />
        <CustomButton title="Save Changes" onPress={handleSubmit} />
      </View> */}
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
})
