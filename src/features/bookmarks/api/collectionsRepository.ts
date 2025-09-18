import { supabase } from "@/src/shared/services/supabase";
import { MovieDetailsType } from "@/src/shared/types/types";
import { FavoriteCollection } from "../types/types";

export const getFavoritesCollection = async (
    collection: FavoriteCollection,
    userId?: string,
): Promise<MovieDetailsType[] | null> => {
    if (!userId) return null;

    const { data, error } = await supabase
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

export const addMovieToCollection = async (
    collection: FavoriteCollection,
    userId: string,
    movieId: string,
    movie: MovieDetailsType,
) => {
    const { error } = await supabase.from(collection).insert({
        user_id: userId,
        movie_id: movieId,
        data: movie,
    });

    if (error) throw new Error(error.message);

    const { error: counterError } = await supabase.rpc("update_stat_counter", {
        p_user_id: userId,
        p_column_name: collection,
        p_increment: 1,
    });

    if (counterError) {
        throw counterError;
    }
};

export const removeFromCollection = async (
    collection: FavoriteCollection,
    userId: string,
    movieId: string,
) => {
    const { error } = await supabase
        .from(collection)
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId);

    if (error) throw new Error(error.message);

    const { error: counterError } = await supabase.rpc("update_stat_counter", {
        p_user_id: userId,
        p_column_name: collection,
        p_increment: -1,
    });

    if (counterError) {
        throw counterError;
    }
};
