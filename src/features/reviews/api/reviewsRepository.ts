import { supabase } from "@/src/shared/services/supabase";
import { ReviewType } from "@/src/shared/types/types";
import { ProfileType } from "../../profile/types/types";
import { reviewSchemaType } from "../lib/zod/review.schema";

export const getAllReviewsOfMovie = async (
    movieId: number,
): Promise<ReviewType[]> => {
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data as ReviewType[];
};

export const getUserReview = async (
    movieId: number,
    userId: string,
): Promise<ReviewType | null> => {
    const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .eq("user_id", userId)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const updateUserReview = async (
    review: reviewSchemaType,
    userReview: ReviewType,
) => {
    const { error } = await supabase
        .from("reviews")
        .update({
            review: review.review,
            rating: userReview.rating ?? null,
            updated_at: new Date().toISOString(),
        })
        .eq("id", userReview.id);

    if (error) throw new Error(error.message);
};

export const addNewReview = async (
    userId: string,
    movieId: number,
    review: reviewSchemaType,
    user: ProfileType,
) => {
    const { error } = await supabase.from("reviews").insert({
        user_id: userId,
        movie_id: movieId,
        review: review.review,
        rating: null,
        updated_at: new Date().toISOString(),
        email: user?.email,
        display_name: (user?.username || user?.email) ?? null,
        photo_url: user?.avatar_url ?? null,
    });
    if (error) throw new Error(error.message);
};
