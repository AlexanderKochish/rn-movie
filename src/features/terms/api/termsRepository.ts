import { supabase } from "@/src/shared/services/supabase";
import { TermsOfServiceType } from "@/src/shared/types/types";

export const getTermsOfService = async (): Promise<TermsOfServiceType[]> => {
    const { data, error } = await supabase
        .from("terms")
        .select("*");

    if (error) throw new Error(error.message);

    return data;
};
