import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useProfile } from "../../profile/hooks/useProfile";
import { ratingsRepository } from "../api/ratingRepository";
import { ratingSchema, ratingSchemaType } from "../lib/rating.schema";
import { MovieRating } from "../types/types";

export const useRating = (movieId: number) => {
  const { profile: user } = useProfile();
  const { control, handleSubmit, reset, setValue, watch } = useForm<
    ratingSchemaType
  >({
    defaultValues: { rating: 0 },
    resolver: zodResolver(ratingSchema),
  });
  const userId = user?.id as string;
  const queryClient = useQueryClient();

  const { data: rating } = useQuery<MovieRating | Error>({
    queryKey: ["ratings", userId, movieId],
    queryFn: async () =>
      await ratingsRepository.getExistingRatingOfMovie(userId, movieId),
    enabled: !!userId || !!movieId,
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: ratingSchemaType) => {
      if (!user || !userId) throw new Error("User not authenticated");
      const existing = await ratingsRepository.getExistingRatingOfMovie(
        userId,
        movieId,
      );

      const ratingValue = Math.round(data.rating * 2);

      if (
        ratingValue === 0 &&
        (!existing?.id || existing.rating > 0)
      ) {
        await ratingsRepository.removeRatinOfMovie(userId, movieId);
        await ratingsRepository.updateUserRatingsStat(userId);
        Toast.show({ type: "customSuccess", text1: "Rating removed" });
        return;
      }

      if (ratingValue === 0 && existing?.id) {
        await ratingsRepository.updateRatingOfMovie(
          existing.id,
          0,
          movieId,
          userId,
        );
        await ratingsRepository.updateUserRatingsStat(userId);
        Toast.show({ type: "customSuccess", text1: "Rating removed" });
        return;
      }

      if (existing) {
        await ratingsRepository.updateRatingOfMovie(
          existing.id,
          ratingValue,
          movieId,
          userId,
        );
        await ratingsRepository.updateUserRatingsStat(userId);
        Toast.show({ type: "customSuccess", text1: "Rating updated" });
      } else {
        await ratingsRepository.addRatingForMovie(
          userId,
          movieId,
          ratingValue,
        );
        await ratingsRepository.updateUserRatingsStat(userId);
        Toast.show({ type: "customSuccess", text1: "Rating created" });
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["reviews", movieId] }),
        queryClient.invalidateQueries({
          queryKey: ["user-review", movieId, userId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["ratings", movieId, userId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["statistics", userId],
        }),
      ]);

      reset();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Toast.show({
          type: "customError",
          text1: "Failed to send rating",
        });
        Error(error.message);
      }
    },
  });

  const onSubmit = (data: ratingSchemaType) => mutate(data);

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isPending,
    isSuccess,
    setValue,
    ratingWatch: watch,
    rating,
  };
};
