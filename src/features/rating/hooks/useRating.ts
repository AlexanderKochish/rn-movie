import { supabase } from "@/src/shared/services/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useProfile } from "../../profile/hooks/useProfile";
import { ratingSchema, ratingSchemaType } from "../lib/rating.schema";

export const useRating = (movieId: number) => {
  const { profile: user } = useProfile();
  const { control, handleSubmit, reset, setValue } = useForm<ratingSchemaType>({
    defaultValues: { rating: 0 },
    resolver: zodResolver(ratingSchema),
  });
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: ratingSchemaType) => {
      if (!user) throw new Error("User not authenticated");

      const { data: existing, error: selErr } = await supabase
        .from("reviews")
        .select("id, rating, review")
        .eq("user_id", user.id)
        .eq("movie_id", movieId)
        .maybeSingle();

      if (selErr) throw selErr;

      const ratingValue = Math.round(data.rating * 2);

      if (
        ratingValue === 0 &&
        (!existing?.review || existing.review.trim() === "")
      ) {
        const { error } = await supabase
          .from("reviews")
          .delete()
          .eq("user_id", user.id)
          .eq("movie_id", movieId);
        if (error) throw error;
        Toast.show({ type: "customSuccess", text1: "Rating removed" });
        return;
      }

      if (ratingValue === 0 && existing?.review) {
        const { error } = await supabase
          .from("reviews")
          .update({
            rating: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
        if (error) throw error;
        Toast.show({ type: "customSuccess", text1: "Rating removed" });
        return;
      }

      if (existing) {
        const { error } = await supabase
          .from("reviews")
          .update({
            rating: ratingValue,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (error) throw error;
        Toast.show({ type: "customSuccess", text1: "Rating updated" });
      } else {
        const { error } = await supabase.from("reviews").insert({
          user_id: user.id,
          movie_id: movieId,
          rating: ratingValue,
          updated_at: new Date().toISOString(),
          email: user.email ?? null,
          display_name: (user.username || user.email) ?? null,
          photo_url: user.avatar_url ?? null,
          review: null,
        });
        if (error) throw error;
        Toast.show({ type: "customSuccess", text1: "Rating created" });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
      queryClient.invalidateQueries({
        queryKey: ["user-review", movieId, user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-rating", movieId, user?.id],
      });
      reset();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Failed to send rating");
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
  };
};
