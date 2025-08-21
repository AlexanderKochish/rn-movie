import { supabase } from '@/src/shared/services/supabase'
import { uploadToCloudinary } from '@/src/shared/utils/fileUploader'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import { Resolver, useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../auth/hooks/useAuth'
import { accountSchema, accountSchemaType } from '../lib/zod/account.schema'

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

  const onSubmit = async (formData: accountSchemaType) => {
    try {
      if (!user) return

      const imageUrl = await uploadAvatar(formData.avatar)

      const payload: Partial<accountSchemaType> = {
        ...formData,
      }

      if (imageUrl) {
        payload.avatar = imageUrl
      }

      if (payload.age) {
        payload.age = Number(payload.age)
      }

      const updateData: Record<string, any> = {}

      if (payload.avatar) updateData.avatar_url = payload.avatar
      if (payload.username) updateData.username = payload.username
      if (payload.age !== undefined) updateData.age = payload.age
      if (payload.fullName) updateData.full_name = payload.fullName

      if (Object.keys(updateData).length > 0) {
        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', user.id)
          .single()

        if (error) {
          Alert.alert('Error', error.message)
        }
      }
      reset({
        avatar: updateData.avatar_url ?? '',
        username: updateData.username ?? '',
        fullName: updateData.full_name ?? '',
        age: updateData.age ?? '',
      })

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
