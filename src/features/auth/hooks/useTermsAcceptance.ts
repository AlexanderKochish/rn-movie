import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useTermsAcceptance = () => {
    const { acceptTerms } = useAuth();

    const { mutate: handleAccept, isPending } = useMutation({
        mutationKey: ["accept-terms"],
        mutationFn: async () => await acceptTerms(),
    });
    return {
        handleAccept,
        isPending,
    };
};
