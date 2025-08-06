import { useAuth } from '@/src/features/auth/hooks/useAuth'
import { useTheme } from '@/src/providers/ThemeProvider/useTheme'
import CustomButton from '@/src/shared/components/UI/Button/Button'
import ControlledTextInput from '@/src/shared/components/UI/ControlledTextInput/ControlledTextInput'
import { Colors } from '@/src/shared/styles/Colors'
import { Typography } from '@/src/shared/styles/Typography'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, StyleSheet, View } from 'react-native'
import { Avatar, Button } from 'react-native-paper'

const AccountScreen = () => {
  const [image, setImage] = useState<string | null>(null)
  const { user } = useAuth()
  const { theme } = useTheme()
  const { control } = useForm({
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
    },
  })
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme].background,
        },
      ]}
    >
      <View style={{ alignItems: 'center', marginBottom: 15, gap: 10 }}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Avatar.Image
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require('../../../../assets/images/profile-placeholder.png')
            }
            size={115}
          />
        )}

        <Button
          labelStyle={{ fontSize: Typography.title.fontSize }}
          icon={'upload'}
          onPress={pickImage}
        >
          Upload your image
        </Button>
      </View>

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
          label={'Email'}
          mode={'outlined'}
          control={control}
          name={'email'}
        />
        <CustomButton title="Save Changes" />
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
  image: {
    width: 200,
    height: 200,
  },
})
