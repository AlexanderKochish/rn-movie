import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useProfile } from "../../profile/hooks/useProfile";
import { ratingsRepository } from "../api/ratingRepository";
import { ratingSchema, ratingSchemaType } from "../lib/rating.schema";

export const useRating = (movieId: number) => {
  const { profile: user } = useProfile();
  const { control, handleSubmit, reset, setValue, watch } = useForm<
    ratingSchemaType
  >({
    defaultValues: { rating: 0 },
    resolver: zodResolver(ratingSchema),
  });
  const userId = user?.id;
  const queryClient = useQueryClient();

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
        (!existing?.review || existing.review.trim() === "")
      ) {
        await ratingsRepository.removeRatinOfMovie(userId, movieId);
        Toast.show({ type: "customSuccess", text1: "Rating removed" });
        return;
      }

      if (ratingValue === null && existing?.review) {
        await ratingsRepository.updateRatingOfMovie(existing.id, null);
        Toast.show({ type: "customSuccess", text1: "Rating removed" });
        return;
      }

      if (existing) {
        await ratingsRepository.updateRatingOfMovie(existing.id, ratingValue);
        Toast.show({ type: "customSuccess", text1: "Rating updated" });
      } else {
        await ratingsRepository.addRatingForMovie(
          userId,
          movieId,
          ratingValue,
          user,
        );
        Toast.show({ type: "customSuccess", text1: "Rating created" });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
      queryClient.invalidateQueries({
        queryKey: ["user-review", movieId, userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-rating", movieId, userId],
      });
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
  };
};
