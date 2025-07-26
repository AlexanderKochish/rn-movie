import { db } from '@/src/shared/services/firebase'
import { ReviewType } from '@/src/shared/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { useAuth } from '../../auth/hooks/useAuth'
import { reviewSchema, reviewSchemaType } from '../lib/zod/review.schema'
import { createReviewDoc } from '../utils/createReviewDoc'

export const useReview = (movieId: number) => {
  const { user } = useAuth()
  const { control, handleSubmit, reset } = useForm<reviewSchemaType>({
    defaultValues: {
      review: '',
    },
    resolver: zodResolver(reviewSchema),
  })
  const queryClient = useQueryClient()

  const { data, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['reviews', movieId],
    queryFn: async () => {
      try {
        const ref = collection(db, 'moviesReviews', String(movieId), 'reviews')

        const snapshot = await getDocs(ref)

        const reviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ReviewType[]

        return reviews
      } catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert('Error', error.message)
        }
      }
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (review: reviewSchemaType) => {
      if (!user?.uid) throw new Error('Unauthorized')
      await createReviewDoc(movieId, user, review)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      reset()
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Failed to send review')
      }
    },
  })

  const onSubmit = (data: reviewSchemaType) => {
    mutate(data)
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    reviews: data,
    isPending,
    isLoadingReviews,
  }
}
