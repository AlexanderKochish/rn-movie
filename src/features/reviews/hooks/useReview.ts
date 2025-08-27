import { supabase } from "@/src/shared/services/supabase";
import { ReviewType } from "@/src/shared/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { useProfile } from "../../profile/hooks/useProfile";
import { reviewSchema, reviewSchemaType } from "../lib/zod/review.schema";

export const useReview = (movieId: number) => {
  const { profile: user } = useProfile();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<reviewSchemaType>({
    defaultValues: { review: "" },
    resolver: zodResolver(reviewSchema),
    mode: "onSubmit",
  });

  const reviewInput = watch("review");
  const isValidValue = !isValid || reviewInput?.trim() === "";

  const { data: allReviews, isLoading: isLoadingReviews } = useQuery<
    ReviewType[]
  >({
    queryKey: ["reviews", movieId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        return [];
      }

      return data as ReviewType[];
    },
  });

  const { data: userReview, isLoading: isLoadingUserReview } = useQuery<
    ReviewType | null
  >({
    queryKey: ["user-review", movieId, user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .eq("user_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        console.error("Error fetching user review:", error);
        return null;
      }

      return data as ReviewType;
    },
    enabled: !!user?.id,
  });

  const mutation = useMutation({
    mutationFn: async (review: reviewSchemaType) => {
      if (!user?.id) throw new Error("Unauthorized");

      if (userReview) {
        const { error } = await supabase
          .from("reviews")
          .update({
            review: review.review,
            rating: userReview.rating ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userReview.id);

        if (error) throw error;
        return "updated";
      } else {
        const { error } = await supabase.from("reviews").insert({
          user_id: user.id,
          movie_id: movieId,
          review: review.review,
          rating: null,
          updated_at: new Date().toISOString(),
          email: user.email,
          display_name: (user.username || user.email) ?? null,
          photo_url: user.avatar_url ?? null,
        });
        if (error) throw error;
        return "created";
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
      queryClient.invalidateQueries({
        queryKey: ["user-review", movieId, user?.id],
      });

      if (result === "created") {
        Alert.alert("Success", "Review added!");
      } else {
        Alert.alert("Success", "Review added!");
      }

      if (result === "created") {
        reset();
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
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
  };
};
