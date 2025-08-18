import { supabase } from '@/src/shared/services/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../auth/hooks/useAuth'
import { ratingSchema, ratingSchemaType } from '../lib/rating.schema'

export const useRating = (movieId: number) => {
  const { user } = useAuth()
  const { control, handleSubmit, reset } = useForm<ratingSchemaType>({
    defaultValues: { rating: 0 },
    resolver: zodResolver(ratingSchema),
  })
  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: ratingSchemaType) => {
      if (!user) return
      const { data: existing, error: selErr } = await supabase
        .from('reviews')
        .select('id, rating')
        .eq('user_id', user.id)
        .eq('movie_id', movieId)
        .maybeSingle()

      if (selErr) throw selErr

      if (!data.rating) {
        const { error } = await supabase
          .from('reviews')
          .delete()
          .eq('user_id', user.id)
          .eq('movie_id', movieId)
        if (error) throw error
        Toast.show({ type: 'customSuccess', text1: 'Rating removed' })
        return
      }

      if (existing) {
        const { error } = await supabase
          .from('reviews')
          .update({
            rating: Math.floor(data.rating * 2),
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)

        if (error) throw error
        Toast.show({ type: 'customSuccess', text1: 'Rating updated' })
      } else {
        const { error } = await supabase.from('reviews').insert({
          user_id: user.id,
          movie_id: movieId,
          rating: data.rating,
          updated_at: new Date().toISOString(),
          email: user.email ?? null,
          display_name: user.user_metadata?.full_name ?? null,
          photo_url: user.user_metadata?.avatar_url ?? null,
        })
        if (error) throw error
        Toast.show({ type: 'customSuccess', text1: 'Rating created' })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', movieId] })
      reset()
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Failed to send rating')
      }
    },
  })

  const onSubmit = (data: ratingSchemaType) => mutate(data)

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isPending,
    isSuccess,
  }
}
