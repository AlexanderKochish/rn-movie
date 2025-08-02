import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../auth/hooks/useAuth'
import { createReviewDoc } from '../../reviews/utils/createReviewDoc'
import { ratingSchema, ratingSchemaType } from '../lib/rating.schema'

export const useRating = (movieId: number) => {
  const { user } = useAuth()
  const { control, handleSubmit, reset } = useForm<ratingSchemaType>({
    defaultValues: {
      rating: 0,
    },
    resolver: zodResolver(ratingSchema),
  })
  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (rating: ratingSchemaType) => {
      if (!user?.uid) throw new Error('Unauthorized')
      const result = rating.rating * 2
      await createReviewDoc(movieId, user, { rating: result })
      Toast.show({
        type: 'customSuccess',
        text1: 'Rating have been sent successfully',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      reset()
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Failed to send rating')
      }
    },
  })

  const onSubmit = (data: ratingSchemaType) => {
    mutate(data)
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isPending,
    isSuccess,
  }
}
