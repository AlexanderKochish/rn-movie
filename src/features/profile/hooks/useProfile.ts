import { supabase } from "@/src/shared/services/supabase";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useAuth } from "../../auth/hooks/useAuth";
import { ProfileType } from "../types/types";

export const useProfile = () => {
  const { user } = useAuth();

  const { data, ...rest } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    queryFn: async (): Promise<ProfileType | null> => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        Alert.alert("Error", error.message);
      }

      return data as ProfileType;
    },
    staleTime: 0,
  });

  return { profile: data, ...rest };
};
