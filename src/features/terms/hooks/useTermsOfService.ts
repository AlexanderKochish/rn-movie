import { TermsOfServiceType } from "@/src/shared/types/types";
import { useQuery } from "@tanstack/react-query";
import { getTermsOfService } from "../api/termsRepository";

export const useTermsOfService = () => {
    const { data: terms, ...rest } = useQuery<TermsOfServiceType[], Error>({
        queryKey: ["terms"],
        queryFn: () => getTermsOfService(),
    });

    return {
        terms,
        ...rest,
    };
};
