import { supabase } from "@/src/shared/services/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

type StatisticsCollection =
    | "liked_movies"
    | "bookmarks"
    | "ratings"
    | "watched";

class Statistics {
    constructor(private readonly db: SupabaseClient) {}

    async upsertProfileStats(
        userId: string,
        collection: StatisticsCollection,
        value: number,
    ) {
        const { data, error } = await this.db
            .from("statistics")
            .upsert(
                { user_id: userId, [collection]: value },
                { onConflict: "user_id" },
            )
            .select()
            .single();

        if (error) throw error;
        return data;
    }
}
export const statsRepository = new Statistics(supabase);
