import { supabase } from "@/src/shared/services/supabase";

export const getFaqCategories = async () => {
    const { data, error } = await supabase
        .from("faq_categories")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getFaqQuestionsByCategory = async (selectedCategoryId: string) => {
    const { data, error } = await supabase
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
