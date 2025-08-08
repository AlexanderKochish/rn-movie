import { uploadToCloudinary } from '@/src/shared/utils/fileUploader'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { updateProfile } from 'firebase/auth'
import { Resolver, useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../auth/hooks/useAuth'
import { accountSchema, accountSchemaType } from '../lib/zod/account.schema'
import { setUserData } from '../utils/updateUserData'

export const useAccountForm = () => {
  const { user } = useAuth()

  const { control, watch, setValue, handleSubmit, reset } =
    useForm<accountSchemaType>({
      defaultValues: {
        username: '',
        fullName: '',
        avatar: '',
      },
      resolver: zodResolver(accountSchema) as Resolver<accountSchemaType>,
    })

  const avatar = watch('avatar')

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri
      setValue('avatar', imageUri)
    }
  }

  const uploadAvatar = async (uri?: string) => {
    if (!uri) return null
    const url = await uploadToCloudinary(uri)
    if (!url) {
      Toast.show({ type: 'customError', text1: 'Image upload failed' })
    }
    return url
  }

  const onSubmit = async (data: accountSchemaType) => {
    try {
      if (!user) return

      const imageUrl = await uploadAvatar(data.avatar)

      const payload: Partial<accountSchemaType> = {
        ...data,
      }

      if (imageUrl) {
        payload.avatar = imageUrl
      }

      if (payload.age) {
        payload.age = Number(payload.age)
      }

      await updateProfile(user, {
        ...(payload.avatar && { photoURL: payload.avatar }),
        ...(payload.username && { displayName: payload.username }),
      })

      if (payload.age || payload.fullName) {
        await setUserData(user.uid, {
          ...(payload.age !== undefined && { age: payload.age }),
          ...(payload.fullName && { fullName: payload.fullName }),
        })
      }

      reset()

      Toast.show({
        type: 'customSuccess',
        text1: 'Profile updated successfully',
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      }
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    handlePickImage,
    avatar,
  }
}
