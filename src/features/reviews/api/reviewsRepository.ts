import { supabase } from "@/src/shared/services/supabase";
import { ReviewType } from "@/src/shared/types/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { reviewSchemaType } from "../lib/zod/review.schema";

class Review {
    constructor(private readonly db: SupabaseClient) {}

    getAllReviewsOfMovie = async (
        movieId: number,
    ): Promise<ReviewType[]> => {
        const { data, error } = await supabase
            .from("movie_feedback")
            .select("*")
            .eq("movie_id", movieId)
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data as ReviewType[];
    };

    getUserReview = async (
        movieId: number,
        userId: string,
    ): Promise<ReviewType | null> => {
        const { data, error } = await this.db
            .from("reviews")
            .select("*")
            .eq("movie_id", movieId)
            .eq("user_id", userId)
            .maybeSingle();
        if (error) throw error;

        return data;
    };

    updateUserReview = async (
        review: reviewSchemaType,
        userReview: ReviewType,
    ) => {
        const { error } = await this.db
            .from("reviews")
            .update({
                review: review.review,
                updated_at: new Date().toISOString(),
            })
            .eq("movie_id", userReview.movie_id)
            .eq("user_id", userReview.user_id);

        if (error) throw new Error(error.message);
    };

    addNewReview = async (
        userId: string,
        movieId: number,
        review: reviewSchemaType,
    ) => {
        const { error } = await this.db.from("reviews").insert({
            user_id: userId,
            movie_id: movieId,
            review: review.review,
            created_at: new Date().toISOString(),
        });
        if (error) throw new Error(error.message);
    };

    removeReviewById = async (userId: string, id: string) => {
        const { data, error } = await this.db
            .from("reviews")
            .delete()
            .eq("id", id)
            .eq("user_id", userId);

        if (error) throw error;

        return data;
    };
}

export const reviewRepository = new Review(supabase);
