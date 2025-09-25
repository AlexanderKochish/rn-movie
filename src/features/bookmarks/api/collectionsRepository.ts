import { supabase } from "@/src/shared/services/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { MovieDetailsType } from "../../movie/types/types";
import { FavoriteCollection } from "../types/types";

class Bookmark {
    constructor(private readonly db: SupabaseClient) {}

    getFavoritesCollection = async (
        collection: FavoriteCollection,
        userId?: string,
    ): Promise<MovieDetailsType[] | null> => {
        if (!userId) return null;

        const { data, error } = await this.db
            .from(collection)
            .select("movie_id, data, created_at")
            .eq("user_id", userId);

        if (error) {
            if (error.code === "PGRST116") return null;
            throw new Error(error.message);
        }

        const favorites = data?.map((row) => ({
            id: row.movie_id,
            ...row.data,
            createdAt: row.created_at,
        })) ?? [];

        return favorites;
    };

    addMovieToCollection = async (
        collection: FavoriteCollection,
        userId: string,
        movieId: string,
        movie: MovieDetailsType,
    ) => {
        const { error } = await this.db.from(collection).insert({
            user_id: userId,
            movie_id: movieId,
            data: movie,
        });

        if (error) throw new Error(error.message);
    };

    removeFromCollection = async (
        collection: FavoriteCollection,
        userId: string,
        movieId: string,
    ) => {
        const { error } = await this.db
            .from(collection)
            .delete()
            .eq("user_id", userId)
            .eq("movie_id", movieId);

        if (error) throw new Error(error.message);
    };
}

export const bookmarkRepository = new Bookmark(supabase);
