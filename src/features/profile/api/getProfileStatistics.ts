import { supabase } from "@/src/shared/services/supabase";

export const getProfileStatistics = async (userId: string) => {
    const { data, error } = await supabase
        .from("statistics")
        .select("liked_movies,bookmarks,ratings,watched")
        .eq("user_id", userId)
        .single();

    if (error) throw error;

    return data;
};
