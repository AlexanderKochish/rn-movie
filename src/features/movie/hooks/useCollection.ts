import { db } from '@/src/shared/services/firebase'
import { MovieDetailsType, MovieUnionType } from '@/src/shared/types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../auth/hooks/useAuth'

export const useCollection = (collectionName: 'favorites' | 'bookmarks') => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const userId = user?.uid

  const queryKey = [collectionName, userId]

  const { data: items = [], isLoading } = useQuery<
    MovieUnionType[] | undefined
  >({
    queryKey,
    queryFn: async () => {
      if (!userId) return []
      try {
        const ref = collection(db, 'users', userId, collectionName)
        const snapshot = await getDocs(ref)

        return snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...(doc.data().data as MovieDetailsType),
        }))
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('error', error.message)
        }
      }
    },
    enabled: !!userId,
  })

  const itemIds = items?.map((item) => item.id)

  const isItemToggled = useCallback(
    (id: number) => itemIds?.includes(id),
    [itemIds]
  )

  const handleToggle = useMutation({
    mutationFn: async (movie: MovieDetailsType | undefined) => {
      if (!userId || !movie?.id) return

      const ref = doc(db, 'users', userId, collectionName, String(movie.id))

      if (isItemToggled(movie.id)) {
        await deleteDoc(ref)
        Toast.show({
          type: 'customRemoved',
          text1: 'Removed from the saved',
        })
      } else {
        await setDoc(ref, {
          data: movie,
          createdAt: new Date().toISOString(),
        })
        Toast.show({
          type: 'customSuccess',
          text1: 'Saved successfully',
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Alert.alert('Ошибка', error.message)
      }
    },
  })

  return {
    items,
    itemIds,
    isItemToggled,
    toggleItem: handleToggle.mutate,
    isPending: handleToggle.isPending,
    isLoading,
  }
}
