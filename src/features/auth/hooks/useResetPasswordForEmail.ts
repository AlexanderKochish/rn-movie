import { supabase } from "@/src/shared/services/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import {
    resetPasswordEmail,
    resetPasswordFromEmailType,
} from "../lib/zod/reset-password-email.schema";

export const useResetPasswordForEmail = () => {
    const { control, handleSubmit, ...rest } = useForm<
        resetPasswordFromEmailType
    >({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(resetPasswordEmail),
    });

    async function onSubmit(data: resetPasswordFromEmailType) {
        console.log(data.email);
        const { error } = await supabase.auth.resetPasswordForEmail(
            data.email,
            {
                redirectTo: "rnmovieapp://reset-password",
            },
        );
        if (error) throw error;

        Alert.alert(
            `A link to change your password has been sent to your email:${data.email}`,
        );
    }

    return {
        control,
        handleSubmit: handleSubmit(onSubmit),
        ...rest,
    };
};
