import { supabase } from "@/src/shared/services/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { FAQCategoryType, FAQQuestionType } from "../types/types";

class Faq {
    constructor(private readonly db: SupabaseClient) {}

    getFaqCategories = async (): Promise<FAQCategoryType[] | null> => {
        const { data, error } = await this.db
            .from("faq_categories")
            .select("*");

        if (error) {
            throw new Error(error.message);
        }

        return data;
    };

    getFaqQuestionsByCategory = async (
        selectedCategoryId: string,
    ): Promise<FAQQuestionType[] | null> => {
        const { data, error } = await this.db
            .from("faq")
            .select("*")
            .eq("category_id", selectedCategoryId)
            .eq("is_active", true)
            .order("sort_order", { ascending: true });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    };
}

export const faqRepository = new Faq(supabase);
