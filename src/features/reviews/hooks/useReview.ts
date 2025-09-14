import { ReviewType } from "@/src/shared/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useProfile } from "../../profile/hooks/useProfile";
import {
  addNewReview,
  getAllReviewsOfMovie,
  getUserReview,
  updateUserReview,
} from "../api/reviewsRepository";
import { reviewSchema, reviewSchemaType } from "../lib/zod/review.schema";

export const useReview = (movieId: number) => {
  const { profile: user } = useProfile();
  const queryClient = useQueryClient();
  const userId = user?.id as string;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<reviewSchemaType>({
    defaultValues: { review: "" },
    resolver: zodResolver(reviewSchema),
    mode: "onSubmit",
  });

  const reviewInput = watch("review");
  const isValidValue = !isValid || reviewInput?.trim() === "";

  const { data: allReviews, isLoading: isLoadingReviews, refetch } = useQuery<
    ReviewType[]
  >({
    queryKey: ["reviews", movieId],
    queryFn: () => getAllReviewsOfMovie(movieId),
  });

  const { data: userReview, isLoading: isLoadingUserReview, isPending } =
    useQuery<
      ReviewType | null,
      Error
    >({
      queryKey: ["user-review", movieId, userId],
      queryFn: async () => {
        if (!userId && !movieId) return null;

        const data = await getUserReview(movieId, userId);

        return data;
      },
      enabled: !!userId,
    });

  const mutation = useMutation({
    mutationFn: async (review: reviewSchemaType) => {
      if (!userId || !user) throw new Error("Unauthorized");

      if (userReview) {
        await updateUserReview(review, userReview);
        return "updated";
      } else {
        await addNewReview(userId, movieId, review, user);
        return "created";
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
      queryClient.invalidateQueries({
        queryKey: ["user-review", movieId, userId],
      });
      if (result === "created") {
        Toast.show({
          type: "customSuccess",
          text1: "Review added!",
        });
      } else {
        Toast.show({
          type: "customSuccess",
          text1: "Review added!",
        });
      }

      if (result === "created") {
        reset();
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Error(error.message);
      }
    },
  });

  const onSubmit = (data: reviewSchemaType) => mutation.mutate(data);

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    reviews: allReviews,
    userReview,
    isPending: mutation.isPending,
    isLoadingReviews: isLoadingReviews || isLoadingUserReview,
    isValidValue,
    hasUserReview: !!userReview,
    isEditing: !!userReview,
    refetch,
  };
};
