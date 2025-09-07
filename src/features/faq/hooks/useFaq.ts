import { supabase } from "@/src/shared/services/supabase";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { FAQCategoryType, FAQQuestionType } from "../types/types";

export const useFaq = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [expandedQuestionIds, setExpandedQuestionIds] = useState<
        string[]
    >([]);

    const toggleQuestion = useCallback((id: string) => {
        setExpandedQuestionIds((prev) =>
            prev?.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    }, []);

    const { data: faqCategory } = useQuery<FAQCategoryType[] | null, Error>({
        queryKey: ["faq-categories"],
        queryFn: async (): Promise<FAQCategoryType[]> => {
            try {
                const { data, error } = await supabase
                    .from("faq_categories")
                    .select("*");

                if (error) {
                    throw error;
                }

                if (!selectedCategoryId) {
                    setSelectedCategoryId(
                        data?.find((category) =>
                            category.name === "All Questions"
                        ).id,
                    );
                }

                return data ?? [];
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw error;
            }
        },
    });

    const { data: faq, isLoading: isLoadingFaq, isError: isErrorFaq } =
        useQuery<
            FAQQuestionType[],
            Error
        >({
            queryKey: ["faq", selectedCategoryId],
            queryFn: async (): Promise<FAQQuestionType[]> => {
                try {
                    const { data, error } = await supabase
                        .from("faq")
                        .select("*")
                        .eq("category_id", selectedCategoryId)
                        .eq("is_active", true)
                        .order("sort_order", { ascending: true });

                    if (error) {
                        throw error;
                    }
                    setExpandedQuestionIds(data);
                    return data ?? [];
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw error;
                }
            },
            enabled: !!selectedCategoryId,
            retry: false,
        });

    return {
        faqCategory,
        selectedCategoryId,
        setSelectedCategoryId,
        faq,
        toggleQuestion,
        expandedQuestionIds,
        isLoadingFaq,
        isErrorFaq,
    };
};
