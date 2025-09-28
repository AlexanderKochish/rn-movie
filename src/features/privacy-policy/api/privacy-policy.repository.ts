import { supabase } from "@/src/shared/services/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { IPrivacyPolicy } from "../types/types";

class PrivacyPolicy {
    constructor(private readonly db: SupabaseClient) {}

    getPrivacyPolicy = async (): Promise<IPrivacyPolicy[]> => {
        const { data, error } = await this.db
            .from("privacy_policy")
            .select("*");

        if (error) throw error;

        return data ?? [];
    };
}

export const privacyRepository = new PrivacyPolicy(supabase);
