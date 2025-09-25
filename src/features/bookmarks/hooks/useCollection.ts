import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import Toast from "react-native-toast-message";
import { MovieDetailsType } from "../../movie/types/types";
import { statsRepository } from "../../profile/api/stats.repository";
import { useProfile } from "../../profile/hooks/useProfile";
import { bookmarkRepository } from "../api/collectionsRepository";
import { FavoriteCollection } from "../types/types";

export const useCollection = (collection: FavoriteCollection) => {
  const { profile: user } = useProfile();
  const queryClient = useQueryClient();
  const userId = user?.id;

  const queryKey = [collection, userId];

  const { data: items = [], isLoading, isError } = useQuery<
    MovieDetailsType[] | null
  >(
    {
      queryKey,
      queryFn: () =>
        bookmarkRepository.getFavoritesCollection(collection, userId),
      enabled: !!userId,
      retry: 1,
    },
  );

  const itemIds = useMemo(() => items?.map((item) => item.id), [items]);

  const isItemToggled = useCallback(
    (id: number) => itemIds?.includes(id),
    [itemIds],
  );

  const handleToggle = useMutation({
    mutationFn: async (movie: MovieDetailsType | undefined) => {
      if (!userId || !movie?.id) return;

      if (isItemToggled(movie.id)) {
        await bookmarkRepository.removeFromCollection(
          collection,
          userId,
          String(movie.id),
        );

        if (items) {
          await statsRepository.upsertProfileStats(
            userId,
            collection,
            Math.max(items.length - 1, 0),
          );
        }

        Toast.show({
          type: "customRemoved",
          text1: "Removed from saved",
        });
      } else {
        await bookmarkRepository.addMovieToCollection(
          collection,
          userId,
          String(movie.id),
          movie,
        );
        if (items) {
          await statsRepository.upsertProfileStats(
            userId,
            collection,
            items.length + 1,
          );
        }
        Toast.show({
          type: "customSuccess",
          text1: "Saved successfully",
        });
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({ queryKey: ["statistics", userId] }),
      ]);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error
        ? error.message
        : "Unfortunately, saving failed.";
      Toast.show({ type: "customError", text1: message });
    },
  });

  return {
    items,
    itemIds,
    isItemToggled,
    toggleItem: handleToggle.mutate,
    isPending: handleToggle.isPending,
    isLoading,
    isError,
  };
};
