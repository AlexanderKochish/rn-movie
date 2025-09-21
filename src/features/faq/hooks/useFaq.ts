import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { faqRepository } from "../api/faqRepository";
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
            const data = await faqRepository.getFaqCategories();

            if (!selectedCategoryId && data) {
                const id = data.find((c) => c.name === "All Questions")?.id;
                if (id) setSelectedCategoryId(id);
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
                if (!selectedCategoryId) return [];
                const data = await faqRepository.getFaqQuestionsByCategory(
                    selectedCategoryId,
                );
                setExpandedQuestionIds(data ? data.map((q) => q.id) : []);
                return data ?? [];
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
