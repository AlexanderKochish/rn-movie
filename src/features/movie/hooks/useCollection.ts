import { supabase } from "@/src/shared/services/supabase";
import { MovieDetailsType, MovieUnionType } from "@/src/shared/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../auth/hooks/useAuth";

export const useCollection = (table: "liked_movies" | "bookmarks") => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;

  const queryKey = [table, userId];

  const { data: items = [], isLoading, isError } = useQuery<MovieUnionType[]>({
    queryKey,
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from(table)
        .select("movie_id, data, created_at")
        .eq("user_id", userId);

      if (error) {
        Alert.alert("Error", error.message);
        return [];
      }

      return (
        data?.map((row) => ({
          id: row.movie_id,
          ...row.data,
          createdAt: row.created_at,
        })) ?? []
      );
    },
    enabled: !!userId,
    retry: 1,
  });

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  const isItemToggled = useCallback(
    (id: number) => itemIds.includes(id),
    [itemIds],
  );

  const handleToggle = useMutation({
    mutationFn: async (movie: MovieDetailsType | undefined) => {
      if (!userId || !movie?.id) return;

      if (isItemToggled(movie.id)) {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq("user_id", userId)
          .eq("movie_id", movie.id);

        if (error) throw error;

        Toast.show({
          type: "customRemoved",
          text1: "Removed from saved",
        });
      } else {
        const { error } = await supabase.from(table).insert({
          user_id: userId,
          movie_id: movie.id,
          data: movie,
        });

        if (error) throw error;

        Toast.show({
          type: "customSuccess",
          text1: "Saved successfully",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
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
