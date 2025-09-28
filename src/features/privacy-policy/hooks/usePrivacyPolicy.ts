import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { privacyRepository } from "../api/privacy-policy.repository";
import { IPrivacyPolicy } from "../types/types";

export const usePrivacyPolicy = () => {
    const [expandedSections, setExpandedSections] = useState<number[]>([]);
    const [showFullContent, setShowFullContent] = useState(false);

    const { data: sections, ...rest } = useQuery<
        IPrivacyPolicy[] | null,
        Error
    >({
        queryKey: ["privacy-policy"],
        queryFn: () => privacyRepository.getPrivacyPolicy(),
        retry: 1,
    });

    const toggleSection = (id: number) => {
        setExpandedSections((prev) =>
            prev.includes(id)
                ? prev.filter((sectionId) => sectionId !== id)
                : [...prev, id]
        );
    };

    return {
        sections,
        expandedSections,
        showFullContent,
        setShowFullContent,
        toggleSection,
        ...rest,
    };
};
