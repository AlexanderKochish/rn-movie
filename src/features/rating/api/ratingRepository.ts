import { supabase } from "@/src/shared/services/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { statsRepository } from "../../profile/api/stats.repository";
import { MovieRating } from "../types/types";

class Rating {
    constructor(
        private readonly db: SupabaseClient,
    ) {}

    getUserRatingsSum = async (userId: string) => {
        const { data, error } = await this.db
            .from("ratings")
            .select("rating")
            .eq("user_id", userId)
            .neq("rating", 0);

        if (error) throw error;
        return (data ?? []).reduce((acc, row) => acc + (row.rating ?? 0), 0);
    };

    async updateUserRatingsStat(userId: string) {
        const sum = await this.getUserRatingsSum(userId);
        await statsRepository.upsertProfileStats(userId, "ratings", sum);
        return sum;
    }
    getAllUserRatingsOfMovie = async (
        movieId: number,
    ): Promise<MovieRating[]> => {
        const { data, error } = await this.db
            .from("ratings")
            .select("*")
            .eq(
                "movie_id",
                movieId,
            );

        if (error) throw error;

        return data;
    };
    getExistingRatingOfMovie = async (
        userId: string,
        movieId: number,
    ): Promise<MovieRating> => {
        const { data: existing, error } = await this.db
            .from("ratings")
            .select("*")
            .eq("user_id", userId)
            .eq("movie_id", movieId)
            .maybeSingle();

        if (error) throw new Error(error.message);

        return existing;
    };

    removeRatinOfMovie = async (
        userId: string,
        movieId: number,
    ) => {
        const { error } = await this.db
            .from("ratings")
            .delete()
            .eq("user_id", userId)
            .eq("movie_id", movieId);
        if (error) throw new Error(error.message);
    };

    updateRatingOfMovie = async (
        existingId: string,
        ratingValue: number | null,
        movieId: number,
        userId: string,
    ) => {
        const { error } = await this.db
            .from("ratings")
            .update({
                rating: ratingValue,
                updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId)
            .eq("movie_id", movieId)
            .eq("id", existingId);
        if (error) throw new Error(error.message);
    };

    addRatingForMovie = async (
        userId: string,
        movieId: number,
        ratingValue: number,
    ) => {
        const { error } = await this.db.from("ratings").insert({
            user_id: userId,
            movie_id: movieId,
            rating: ratingValue,
            updated_at: new Date().toISOString(),
        });
        if (error) throw new Error(error.message);
    };
}

export const ratingsRepository = new Rating(supabase);
