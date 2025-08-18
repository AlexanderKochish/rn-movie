import { supabase } from '@/src/shared/services/supabase'
import { ReviewType } from '@/src/shared/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { useAuth } from '../../auth/hooks/useAuth'
import { reviewSchema, reviewSchemaType } from '../lib/zod/review.schema'

export const useReview = (movieId: number) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<reviewSchemaType>({
    defaultValues: { review: '' },
    resolver: zodResolver(reviewSchema),
    mode: 'onSubmit',
  })

  const reviewInput = watch('review')
  const isValidValue = !isValid || reviewInput?.trim() === ''

  const { data, isLoading: isLoadingReviews } = useQuery<ReviewType[]>({
    queryKey: ['reviews', movieId],
    queryFn: async () => {
      if (!user?.id) return []

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('movie_id', movieId)

      if (error) {
        Alert.alert('Ошибка', error.message)
        return []
      }

      return data as ReviewType[]
    },
    enabled: !!user?.id,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (review: reviewSchemaType) => {
      if (!user?.id) throw new Error('Unauthorized')

      const { error } = await supabase.from('reviews').insert({
        user_id: user.id,
        movie_id: movieId,
        review: review.review,
        rating: null,
        updated_at: new Date().toISOString(),
        email: user.email,
        display_name: user.user_metadata.username ?? null,
        photo_url: user.user_metadata.avatar_url ?? null,
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', movieId] })
      reset()
    },
    onError: (error: unknown) => {
      if (error instanceof Error) Alert.alert('Ошибка', error.message)
    },
  })

  const onSubmit = (data: reviewSchemaType) => mutate(data)

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    reviews: data,
    isPending,
    isLoadingReviews,
    isValidValue,
  }
}
