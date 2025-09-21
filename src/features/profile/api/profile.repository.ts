import { supabase } from "@/src/shared/services/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import {
    ProfileNotificationPreferences,
    ProfileStats,
    ProfileType,
    ProfileUpdate,
} from "../types/types";

class Profile {
    constructor(
        private readonly db: SupabaseClient,
    ) {}
    getProfileStatistics = async (
        userId: string,
    ): Promise<ProfileStats | null> => {
        const { data, error } = await this.db
            .from("statistics")
            .select("liked_movies,bookmarks,ratings,watched")
            .eq("user_id", userId)
            .single();

        if (error) throw error;

        return data;
    };

    getProfile = async (
        userId: string | undefined,
    ): Promise<ProfileType | null> => {
        if (!userId) return null;
        const { data, error } = await this.db
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            throw error;
        }

        return data;
    };

    getProfileNotificationPreferences = async (
        userId: string | undefined,
    ): Promise<ProfileNotificationPreferences | null> => {
        if (!userId) throw new Error("User not authenticated");

        const { data, error } = await this.db
            .from("profiles")
            .select("marketing_emails, notifications, expo_push_token")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching preferences:", error);
            throw error;
        }
        return data;
    };

    updateProfile = async (
        userId: string | undefined,
        updateData: ProfileUpdate,
    ) => {
        const { error } = await this.db
            .from("profiles")
            .update(updateData)
            .eq("id", userId)
            .single();

        if (error) throw error;

        return updateData;
    };
}

export const profileRepository = new Profile(supabase);
