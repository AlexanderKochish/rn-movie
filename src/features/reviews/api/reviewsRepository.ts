import { supabase } from "@/src/shared/services/supabase";
import { ReviewType } from "@/src/shared/types/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { ProfileType } from "../../profile/types/types";
import { reviewSchemaType } from "../lib/zod/review.schema";

class Review {
    constructor(private readonly db: SupabaseClient) {}

    getAllReviewsOfMovie = async (
        movieId: number,
    ): Promise<ReviewType[]> => {
        const { data, error } = await this.db
            .from("reviews")
            .select("*")
            .eq("movie_id", movieId)
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

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
            .single();

        if (error) {
            throw new Error(error.message);
        }

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
                rating: userReview.rating ?? null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", userReview.id);

        if (error) throw new Error(error.message);
    };

    addNewReview = async (
        userId: string,
        movieId: number,
        review: reviewSchemaType,
        user: ProfileType,
    ) => {
        const { error } = await this.db.from("reviews").insert({
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
}

export const reviewRepository = new Review(supabase);
