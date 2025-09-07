import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
    getFaqCategories,
    getFaqQuestionsByCategory,
} from "../api/faqRepository";
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
            const data = await getFaqCategories();

            if (!selectedCategoryId) {
                setSelectedCategoryId(
                    data?.find((category) => category.name === "All Questions")
                        .id,
                );
            }

            return data ?? [];
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
                    const data = await getFaqQuestionsByCategory(
                        selectedCategoryId,
                    );
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
