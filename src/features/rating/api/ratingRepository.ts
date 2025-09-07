import { supabase } from "@/src/shared/services/supabase";
import { ProfileType } from "../../profile/types/types";

export const getExistingRatingOfMovie = async (
    userId: string,
    movieId: number,
) => {
    const { data: existing, error } = await supabase
        .from("reviews")
        .select("id, rating, review")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .maybeSingle();

    if (error) throw new Error(error.message);

    return existing;
};

export const removeRatinOfMovie = async (
    userId: string,
    movieId: number,
) => {
    const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId);
    if (error) throw new Error(error.message);
};

export const updateRatingOfMovie = async (
    existingId: string,
    ratingValue: number | null,
) => {
    const { error } = await supabase
        .from("reviews")
        .update({
            rating: ratingValue,
            updated_at: new Date().toISOString(),
        })
        .eq("id", existingId);
    if (error) throw new Error(error.message);
};

export const addRatingForMovie = async (
    userId: string,
    movieId: number,
    ratingValue: number,
    user: ProfileType,
) => {
    const { error } = await supabase.from("reviews").insert({
        user_id: userId,
        movie_id: movieId,
        rating: ratingValue,
        updated_at: new Date().toISOString(),
        email: user.email ?? null,
        display_name: (user.username || user.email) ?? null,
        photo_url: user.avatar_url ?? null,
        review: null,
    });
    if (error) throw new Error(error.message);
};
