import { useAccountForm } from '@/src/features/profile/hooks/useAccountForm'
import { useProfile } from '@/src/features/profile/hooks/useProfile'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { BaseColors, Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import { Avatar, Button } from 'react-native-paper'

import React from 'react'
import { Controller } from 'react-hook-form'
import { Image, StyleSheet, View } from 'react-native'

const AccountScreen = () => {
  const { profile } = useProfile()
  const { theme } = useTheme()
  const { control, handleSubmit, avatar, handlePickImage, isLoading } =
    useAccountForm()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme].background,
        },
      ]}
    >
      <Controller
        control={control}
        name="avatar"
        render={() => (
          <View style={styles.imageWrapper}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.image} />
            ) : (
              <Avatar.Image
                source={
                  profile?.avatar_url
                    ? { uri: profile.avatar_url }
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
        <Button
          mode="contained"
          style={{ borderRadius: 4 }}
          textColor={BaseColors.white}
          loading={isLoading}
          onPress={handleSubmit}
        >
          Save Changes
        </Button>
      </View>
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
