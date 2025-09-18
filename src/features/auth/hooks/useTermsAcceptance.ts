import { supabase } from "@/src/shared/services/supabase";
import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "./useAuth";

export const useTermsAcceptance = () => {
    const { acceptTerms, user } = useAuth();
    const [accepted, setAccepted] = useState(false);

    const handleAccept = async () => {
        if (!accepted) {
            Alert.alert("Error", "Please accept the terms of use");
            return;
        }

        try {
            await acceptTerms();

            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    terms_accepted: true,
                    terms_accepted_at: new Date().toISOString(),
                })
                .eq("id", user?.id)
                .single();
            if (profileError) {
                return Alert.alert("Error", "Failed to save terms accepted");
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(
                    "Error",
                    "Unable to accept the terms. Please try again.",
                );
            }
            throw error;
        }
    };

    return {
        handleAccept,
        setAccepted,
        accepted,
    };
};
